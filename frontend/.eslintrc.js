module.exports = {
    root: true,
    env: {
      node: true,
      browser: true,
    },
    parserOptions: {
      parser: 'babel-eslint', // Utilise babel-eslint pour gérer la syntaxe ES6
      ecmaVersion: 2020, // Utilise la version ECMAScript 2020
      sourceType: 'module', // Permet l'utilisation des modules
    },
    extends: [
      'plugin:vue/vue3-essential', // Utilise les règles essentielles de Vue 3
      'eslint:recommended' // Utilise les règles recommandées d'ESLint
    ],
    rules: {
      // Ajoute des règles ESLint personnalisées ici si nécessaire
    },
  };
  