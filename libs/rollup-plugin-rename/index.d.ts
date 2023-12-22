/// <reference types="acorn" />
import { Node } from 'estree'
import { Plugin } from 'rollup'

export interface IRenameExtensionsOptions {
  /**
   * Files to include
   */
  include?: Array<string | RegExp> | string | RegExp | null
  /**
   * Files to explicitly exclude
   */
  exclude?: Array<string | RegExp> | string | RegExp | null
  /**
   * Generate source maps for the transformations.
   */
  sourceMap?: boolean
  /**
   * Object describing the transformations to use.
   * IE. Input filename => Output filename.
   * Extensions should include the dot for both input and output.
   */
  map: (name: string) => string
  /**
   * An acorn.Options object.
   * This option will extend the default:
   * `{ ecmaVersion: 6, sourceType: 'module' }`
   * Provide it if you do not transpile any es7+ features
   * @see https://github.com/acornjs/acorn/blob/master/acorn/src/options.js
   * @see https://github.com/acornjs/acorn/blob/9899904395d67776a78702fe5640ea4bc12b9ec6/acorn/dist/acorn.d.ts#L14
   */
  parserOptions?: acorn.Options
}
export declare function isEmpty(array: unknown[] | undefined): boolean
export declare function getParserOptions(options?: acorn.Options): acorn.Options
export declare function getRequireSource(node: any): Node | false
export declare function getImportSource(node: any): Node | false
export declare function getExportSource(node: any): Node | false
export declare function rewrite(input: string, map: (_name: string) => string): string
export declare function rename(mappings: Array<IRenameExtensionsOptions>): Plugin
