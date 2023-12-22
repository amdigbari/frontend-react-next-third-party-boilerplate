import commonjs from '@rollup/plugin-commonjs'
import eslint from '@rollup/plugin-eslint'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import swc from '@rollup/plugin-swc'
import typescript from '@rollup/plugin-typescript'
import { readFileSync } from 'node:fs'
import del from 'rollup-plugin-delete'
import dotenv from 'rollup-plugin-dotenv'
import gzipPlugin from 'rollup-plugin-gzip'
import external from 'rollup-plugin-peer-deps-external'
import styles from 'rollup-plugin-styles'
import { visualizer } from 'rollup-plugin-visualizer'

import { stylesBasePath, stylesFileExtensions } from './common.rollup.config.mjs'
import { rename } from './libs/rollup-plugin-rename/index.js'
import { stylelint } from './libs/rollup-plugin-stylelint/index.js'

const swcConfigs = JSON.parse(readFileSync(new URL('./.swcrc', import.meta.url)))

/**
 * @param {*} format Either esm or cjs
 * @returns rollup config
 */
export const scriptsConfig = (format) => ({
  input: 'src/index.ts',
  output: [
    {
      dir: `dist/${format}`,
      format: format,
      exports: 'named',
      sourcemap: true,
      preserveModules: true,
      assetFileNames: '[name][extname]',
    },
  ],
  treeshake: 'recommended',

  plugins: [
    del({ targets: `dist/${format}/*`, runOnce: true }),

    eslint(),

    stylelint({ include: stylesFileExtensions }),

    dotenv(),

    replace({
      values: {
        NODE_ENV: process.env.NODE_ENV,
        npm_package_version: process.env.npm_package_version,
      },
      preventAssignment: true,
    }),

    external(),

    styles({
      autoModules: /\.(module|export)\.(scss|css|sass)$/, // use .module.[ext] and .export.[ext]
      sass: { includePaths: [stylesBasePath] },
      mode: format === 'esm' ? 'extract' : 'inject',
    }),

    resolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),

    json(),

    commonjs(),

    swc({ swc: { ...swcConfigs, jsc: { ...swcConfigs.jsc, target: format === 'esm' ? 'es2022' : 'es5' } } }),

    rename([
      { include: [/.*/], map: (name) => name.replace('node_modules/', 'dependencies/') },
      { include: [/_virtual.*/], map: (name) => name.replace('node_modules/', 'dependencies/') },
    ]),

    gzipPlugin(),

    visualizer({ filename: `analyze/bundle-analyze.html` }),

    typescript({
      declaration: true,
      declarationDir: `dist/${format}`,
      exclude: ['**/*.test.*', '**/*.stories.*', '**/*.mock.*'],
    }),
  ],
})
