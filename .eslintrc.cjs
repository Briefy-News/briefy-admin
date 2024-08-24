module.exports = {
  root: true,
  extends: ['@tata-v/eslint-config-react'],
  plugins: ['react-refresh'],
  ignorePatterns: ['tailwind.config.ts', 'README.md', 'tsconfig.json'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-no-duplicate-props': 'off',
    'no-plusplus': 'off',
    'no-underscore-dangle': 'off',
  },
};
