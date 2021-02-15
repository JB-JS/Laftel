module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': 0,
    camelcase: 0,
    'no-undef': 0,
    'no-unused-vars': 0,
    'func-names': 0,
    'arrow-parens': { "requireForBlockBody": true }
  },
};
