module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'import/prefer-default-export': [0],
    'import/no-unresolved': [0],
    'import/extensions': [0],
    'class-methods-use-this': [0],
    'no-unused-expressions': [0],
    'prefer-template': [0],
    'no-return-assign': [0],
    'no-param-reassign': [0],
    'no-restricted-syntax': [0],
    'operator-assignment': [0],
    'no-plusplus': [0],
  },
};
