import { fileURLToPath } from 'node:url'

// NOTE: Base path of the styles. Will be used in the script and styles config.
export const stylesBasePath = fileURLToPath(new URL('src/styles', import.meta.url))

// NOTE: This will be used inside stylelint plugin include option
export const stylesFileExtensions = ['*.css', '*.scss', '*.sass']
