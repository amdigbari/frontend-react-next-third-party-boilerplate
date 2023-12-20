/**
 * NOTE: Keep this file if you want to use the StyleLint in your project
 * NOTE: To see each key usage specification, please see StyleLint documentation link.
 * NOTE: https://stylelint.io/
 */
module.exports = {
  root: true,
  extends: [
    'stylelint-config-standard',
    'stylelint-config-standard-scss',
    'stylelint-config-prettier',
    'stylelint-config-prettier-scss',
  ],
  plugins: ['stylelint-scss', 'stylelint-no-unsupported-browser-features'],
  rules: {
    'max-nesting-depth': [3, { ignore: ['pseudo-classes', 'blockless-at-rules'] }],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        severity: 'warning',
        browsers: [
          'last 1 version',
          '> 0.5%',
          'not dead',
          'not op_mini all',
          'not ie 11',
        ],
        ignore: ['css3-cursors', 'css3-cursors-newer', 'multicolumn'],
      },
    ],
    'color-function-notation': null,
    'color-hex-length': 'long',
    'scss/dollar-variable-empty-line-before': null,
    'custom-property-empty-line-before': null,
    'selector-pseudo-class-no-unknown': null,
    'property-no-unknown': null,
    'declaration-empty-line-before': null,
    'length-zero-no-unit': null,
    'alpha-value-notation': null,
    'value-no-vendor-prefix': null,
  },
  ignorePatterns: ['node_modules', 'styles', 'dist', '.vscode'],
}
