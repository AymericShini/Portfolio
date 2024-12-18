/* eslint-env node */
module.exports = {
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:@next/next/recommended',
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es6: true,
  },
  rules: {
    'import/order': 'off', // Disable the import order rule
    'no-console': 'error',
    'no-unused-vars': 'error', // Disable the no-unused-vars rule
  },
  overrides: [
    {
      files: ['pages/_app.tsx'],
      rules: {
        'import/order': 'off', // Temporarily disable import/order for _app.tsx
      },
    },
  ],
};
