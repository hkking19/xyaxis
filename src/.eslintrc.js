module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'plugin:node/recommended',
    'prettier'
  ],
  plugins : [
    'node',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
  },
};
