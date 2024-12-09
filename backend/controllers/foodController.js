const axios = require('axios');
const { Translate } = require('@google-cloud/translate').v2;

const translate = new Translate({
  key: `${process.env.GOOGLE_TRANSLATE_API}`,
});

const verifierAliment = async (req, res) => {
  const { aliment, codeBarre } = req.query;

  if (!aliment && !codeBarre) {
    return res.status(400).json({ error: 'Veuillez fournir un aliment ou un code-barre.' });
  }

  try {
    let response;
    let allergenes = [];

    if (codeBarre) {
      response = await axios.get(`https://world.openfoodfacts.org/api/v0/product/${codeBarre}.json`);
      allergenes = response.data.product?.allergens_tags || [];
    } else {
      response = await axios.get('https://world.openfoodfacts.org/cgi/search.pl', {
        params: {
          search_terms: aliment,
          search_simple: 1,
          fields: 'allergens_tags',
          json: 1,
        },
      });

      const produits = response.data.products || [];
      produits.forEach(product => {
        (product.allergens_tags || []).forEach(allergene => {
          if (!allergenes.includes(allergene)) allergenes.push(allergene);
        });
      });
    }

    const allergenesNettoyes = allergenes.map(a =>
      a.replace(/^(en:|fr:)/, '').replace('_', ' ')
    );

    const [allergenesTraduits] = await translate.translate(allergenesNettoyes, 'fr');

    res.status(200).json({ allergenes: allergenesTraduits });
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'aliment :', error);
    res.status(500).json({ error: 'Erreur lors de la vérification.' });
  }
};

module.exports = { verifierAliment };
