const axios = require('axios');
const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate({
  key: `${process.env.GOOGLE_TRANSLATE_API}`,
});

const verifierAliment = async (req, res) => {
  const { codeBarre } = req.query;

  if (!codeBarre) {
    return res.status(400).json({ error: 'Veuillez fournir un code-barre.' });
  }

  try {
    const response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${codeBarre}.json`);
    const allergenes = response.data.product?.allergens_tags || [];
    const nomAliment = response.data.product?.product_name || "Nom inconnu";
    const imageUrl = response.data.product?.image_url || "";

    const allergenesNettoyes = allergenes.map(a =>
      a.replace(/^(en:|fr:)/, '').replace('_', ' ')
    );

    const [allergenesTraduits] = await translate.translate(allergenesNettoyes, 'fr');

    res.status(200).json({ 
      allergenes: allergenesTraduits, 
      nomAliment, 
      imageUrl,
      source: "Les informations affichées proviennent de la base de données OpenFoodFacts (https://world.openfoodfacts.org)."
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'aliment :', error);
    res.status(500).json({ error: 'Erreur lors de la vérification.' });
  }
};

module.exports = { verifierAliment };

