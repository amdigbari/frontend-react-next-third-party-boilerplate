/**
 * NOTE: Keep this file if you want to use the ESLint in your project
 * NOTE: To see each key usage specification, please see ESLint documentation link.
 * NOTE: https://eslint.org/docs/latest/
 */
module.exports = {
  root: true,
  env: { browser: true, node: true, jest: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next',
    'prettier',
    'plugin:storybook/recommended',
  ],
  plugins: ['@typescript-eslint'],
  parserOptions: { sourceType: 'module', ecmaVersion: 2022 },
  rules: {
    '@next/next/no-html-link-for-pages': 'off',
    'react/jsx-key': 'error',
    'import/first': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-var': 'error',
    semi: 'off',
    indent: ['error', 2, { ignoredNodes: ['TemplateLiteral'], SwitchCase: 1 }],
    'prefer-const': 'error',
    'no-debugger': 'error',
    'no-console': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    /**
     * NOTE: Overriding some rules based on the filename.
     * @example overriding default configs to testing-library/react for test files.
     */
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)', '**/__mocks__/**/*.[jt]s?(x)'],
      env: { jest: true },
      extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
      rules: {
        'import/no-extraneous-dependencies': ['off', { devDependencies: ['**/?(*.)+(spec|test).[jt]s?(x)'] }],
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['*.js'],
      rules: { '@typescript-eslint/no-var-requires': 'off' },
    },
  ],
  ignorePatterns: [
    'node_modules',
    'styles',
    'dist',
    '.vscode',
    '.storybook',
    '!.release',
    'libs/**/*.d.ts',
    'libs/**/*.js',
    '*.css',
    '*.scss',
    '*.sass',
  ],
}
