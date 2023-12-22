/* eslint-disable @typescript-eslint/no-explicit-any */
import { createFilter } from '@rollup/pluginutils'
import { Node } from 'estree'
import { walk } from 'estree-walker'
import MagicString from 'magic-string'
import { OutputBundle, Plugin, PluginContext } from 'rollup'

enum NodeType {
  Literal = 'Literal',
  CallExpression = 'CallExpression',
  Identifier = 'Identifier',
  ImportDeclaration = 'ImportDeclaration',
  ExportNamedDeclaration = 'ExportNamedDeclaration',
  ExportAllDeclaration = 'ExportAllDeclaration',
}

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

export function isEmpty(array: unknown[] | undefined) {
  return !array || array.length === 0
}

const defaultParserOptions: acorn.Options = {
  ecmaVersion: 2017,
  sourceType: 'module',
}

export function getParserOptions(options?: acorn.Options): acorn.Options {
  if (!options) {
    return defaultParserOptions
  }

  return {
    ...defaultParserOptions,
    ...options,
  }
}

export function getRequireSource(node: any): Node | false {
  if (node.type !== NodeType.CallExpression) {
    return false
  }

  if (node.callee.type !== NodeType.Identifier || isEmpty(node.arguments)) {
    return false
  }

  const args = node.arguments

  if (node.callee.name !== 'require' || args[0].type !== NodeType.Literal) {
    return false
  }

  return args[0]
}

export function getImportSource(node: any): Node | false {
  if (node.type !== NodeType.ImportDeclaration || node.source.type !== NodeType.Literal) {
    return false
  }

  return node.source
}

export function getExportSource(node: any): Node | false {
  const exportNodes = [NodeType.ExportAllDeclaration, NodeType.ExportNamedDeclaration]

  if (!exportNodes.includes(node.type) || !node.source || node.source.type !== NodeType.Literal) {
    return false
  }

  return node.source
}

export function rewrite(input: string, map: (_name: string) => string): string {
  return map(input)
}

function singleRename(
  options: {
    bundle: OutputBundle
    key: string
    file: any
    context: PluginContext
  } & IRenameExtensionsOptions
): void {
  const { bundle, file, key, context } = options

  const filter = createFilter(options.include, options.exclude)
  if (!filter(file.facadeModuleId)) {
    return
  }

  file.facadeModuleId = rewrite(file.facadeModuleId, options.map) || file.facadeModuleId
  file.fileName = rewrite(file.fileName, options.map) || file.fileName
  file.imports.map((imported: string) => {
    if (!filter(imported)) {
      return imported
    }

    return rewrite(imported, options.map) || imported
  })

  if (file.code) {
    const magicString = new MagicString(file.code)
    const ast = context.parse(file.code, getParserOptions(options.parserOptions))

    walk(ast, {
      enter(node: any) {
        if (
          [
            NodeType.ImportDeclaration,
            NodeType.CallExpression,
            NodeType.ExportAllDeclaration,
            NodeType.ExportNamedDeclaration,
          ].includes(node.type as NodeType)
        ) {
          const req: any = getRequireSource(node) || getImportSource(node) || getExportSource(node)

          if (req) {
            const { start, end } = req
            const newPath = rewrite(req.value, options.map)
            magicString.overwrite(start, end, `'${newPath}'`)
          }
        }
      },
    })

    if (options.sourceMap !== false) {
      file.map = magicString.generateMap()
    }

    file.code = magicString.toString()
  }

  delete bundle[key]
  bundle[rewrite(key, options.map) || key] = file
}

export function rename(mappings: Array<IRenameExtensionsOptions>): Plugin {
  return {
    name: 'rename-rollup',
    generateBundle(_: any, bundle: any) {
      const files = Object.entries<any>(bundle)

      for (const [key, file] of files) {
        for (const options of mappings) {
          singleRename({ context: this, bundle, key, file, ...options })
        }
      }
    },
  }
}
