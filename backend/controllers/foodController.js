const axios = require('axios');
const fs = require('fs');
const path = require('path');
const db = require('../utils/db');
const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate({
  key: process.env.GOOGLE_TRANSLATE_API,
});

const verifierAliment = async (req, res) => {
  const { codeBarre } = req.query;
  if (!codeBarre) {
    return res.status(400).json({ error: 'Veuillez fournir un code-barre.' });
  }
  try {
    const barcodeData = await db.query(
      `
      SELECT b.barcode, b.barcode_name, b.created_at, ba.allergen_id, a.allergen_name
      FROM barcodes b
      LEFT JOIN barcode_allergens ba ON b.barcode = ba.barcode
      LEFT JOIN allergens a ON ba.allergen_id = a.allergen_id
      WHERE b.barcode = $1
      `,
      [codeBarre]
    );
    const localImagePath = `/uploads/analyse/${codeBarre}.jpg`;
    const fullImagePath = path.resolve('uploads/analyse', `${codeBarre}.jpg`);
    if (barcodeData.rows.length > 0) {
      const barcodeInfo = {
        barcode: barcodeData.rows[0].barcode,
        barcode_name: barcodeData.rows[0].barcode_name,
        created_at: barcodeData.rows[0].created_at,
        allergenes: barcodeData.rows
          .filter(row => row.allergen_id) 
          .map(row => row.allergen_name),
      };
      return res.status(200).json({
        ...barcodeInfo,
        imageUrl: fs.existsSync(fullImagePath) ? localImagePath : null,
        source: "Les informations affichées proviennent de la base de données OpenFoodFacts.",
      });
    }
    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${codeBarre}.json`);
    const allergenes = response.data.product?.allergens_tags || [];
    const traces = response.data.product?.traces_tags || [];
    const nomAliment = response.data.product?.product_name || "Nom inconnu";
    const remoteImageUrl = response.data.product?.image_url || "";
    const allergenesEtTraces = [...allergenes, ...traces];
    const allergenesNettoyes = allergenesEtTraces.map(a =>
      a.replace(/^(en:|fr:)/, '').replace('_', ' ').toLowerCase()
    );
    const allergenesNettoyesFiltrés = allergenesNettoyes.filter(a => a.trim() !== "");
    if (allergenesNettoyesFiltrés.length === 0) {
      if (!fs.existsSync(fullImagePath) && remoteImageUrl) {
        try {
          await downloadImage(remoteImageUrl, `${codeBarre}.jpg`);
        } catch (err) {
          console.error("Erreur lors du téléchargement de l'image :", err);
        }
      }
      return res.status(200).json({
        barcode: codeBarre,
        barcode_name: nomAliment,
        allergenes: [],
        message: "Cet aliment ne contient pas d'allergènes connus.",
        imageUrl: fs.existsSync(fullImagePath) ? localImagePath : null,
        source: "Les informations affichées proviennent de la base de données OpenFoodFacts.",
      });
    }
    const [allergenesTraduits] = await translate.translate(allergenesNettoyes, 'fr');
    await db.query(
      'INSERT INTO barcodes (barcode, barcode_name, created_at) VALUES ($1, $2, NOW())',
      [codeBarre, nomAliment]
    );
    if (remoteImageUrl) {
      try {
        await downloadImage(remoteImageUrl,`${codeBarre}.jpg`);
      } catch (err) {
        console.error("Erreur lors du téléchargement de l'image :", err);
      }
    }
    for (const allergen of allergenesTraduits) {
      const allergenLowerCase = allergen.toLowerCase();
      const existingAllergen = await db.query(
        'SELECT allergen_id FROM allergens WHERE LOWER(allergen_name) = $1',
        [allergenLowerCase]
      );
      if (existingAllergen.rows.length) {
        const allergenId = existingAllergen.rows[0].allergen_id;
        await db.query(
          'INSERT INTO barcode_allergens (barcode, allergen_id) VALUES ($1, $2)',
          [codeBarre, allergenId]
        );
      }
    }
    res.status(200).json({
      barcode: codeBarre,
      barcode_name: nomAliment,
      allergenes: allergenesTraduits,
      imageUrl: fs.existsSync(fullImagePath) ? localImagePath : null,
      source: "Les informations affichées proviennent de la base de données OpenFoodFacts.",
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'aliment :', error);
    res.status(500).json({ error: 'Erreur lors de la vérification.' });
  }
};

const downloadImage = async (imageUrl, fileName) => {
  const filePath = path.resolve('uploads/analyse', fileName);
  const writer = fs.createWriteStream(filePath);
  const response = await axios({
    url: imageUrl,
    method: 'GET',
    responseType: 'stream',
  });
  return new Promise((resolve, reject) => {
    response.data.pipe(writer);
    writer.on('finish', () => {
      console.log(`Image téléchargée : ${filePath}`);
      resolve(filePath);
    });
    writer.on('error', reject);
  });
};

module.exports = { verifierAliment };