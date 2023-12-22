import del from 'rollup-plugin-delete'
import stylelint from 'rollup-plugin-stylelint'
import styles from 'rollup-plugin-styles'

import { stylesBasePath, stylesFileExtensions } from './common.rollup.config.mjs'

const isProduction = process.env.NODE_ENV === 'production'

const commonPlugins = [
  stylelint({ include: stylesFileExtensions }),

  styles({
    modules: false,
    sass: {
      /**
       * @param data Additional Data to the scss file, like adding $scss-variable using env variables
       * @param includePaths With this option, we can import files directly from basePath instead of importing it relatively
       * @param includePaths Example: import '../../styles/some-file' ---> import 'some-file'
       */
      data: '',
      includePaths: [stylesBasePath],
    },
    mode: 'extract',
    sourceMap: true,
    minimize: isProduction,
  }),
]

// NOTE: This config will be used to generate a global CSS file.
export const globalCssFileConfig = {
  input: 'src/styles/_global.scss',
  output: [
    {
      dir: 'dist/styles',
      assetFileNames: 'global.css',
    },
  ],
  plugins: [
    del({ targets: 'dist/styles/*', runOnce: true }),

    ...commonPlugins,

    // NOTE: This plugin has been used to add export of scss helpers like mixins and function.
    // Remove this in case you do not intend to do so.
    copy({
      targets: [
        // NOTE: Adds sass file to dist/styles/helpers
        { src: 'src/styles/helpers/**/*.scss', dest: 'dist' },
        { src: 'src/styles/_helpers.scss', dest: 'dist' },
      ],
      flatten: false,
    }),
  ],
}

// NOTE: This config will be used to generate a global font file.
// You will only need this file if you're planning to use a custom font in your third-party.
export const fontsCssFileConfig = {
  input: 'src/styles/_fonts-global.scss',
  output: [
    {
      dir: 'dist/styles',
      assetFileNames: 'fonts.css',
    },
  ],
  plugins: [del({ targets: 'dist/styles/fonts.css', runOnce: true }), ...commonPlugins],
}
