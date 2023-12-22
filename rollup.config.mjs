import { scriptsConfig } from './scripts.rollup.config.mjs'

// import { fontsCssFileConfig, globalCssFileConfig } from './styles.rollup.config.mjs'

const config = [
  scriptsConfig('cjs'),
  scriptsConfig('esm'),
  //   // NOTE: You will only need to add below configs if you're writing a UI-kit third-party.
  //   globalCssFileConfig,
  //   // NOTE: You will only need this config if you're planning to use a custom font in your UI-kit third-party.
  //   fontsCssFileConfig,
]
export default config
