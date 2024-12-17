module.exports = {
    root: true,
    env: {
      node: true,
      browser: true,
      jest: true,
    },
    parserOptions: {
      parser: 'babel-eslint',
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    extends: [
      'plugin:vue/vue3-essential',
      'eslint:recommended'
    ]
};
  