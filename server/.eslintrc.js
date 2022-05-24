module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended','prettier'], // Uses the linting rules from @typescript-eslint/eslint-plugin
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest', // Allows the use of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports,
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint','prettier'],
  env: {
    node: true, // Enable Node.js global variables
  },
  rules: {
    'no-console': ['warn'],
    '@typescript-eslint/no-explicit-any': ['off'],
    'no-unused-vars': ['warn', { args: 'none' }],
    semi: ['warn'],
  },
  ignorePatterns: ['src/**/*.test.ts'],
};
