'use strict'
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.rename =
  exports.rewrite =
  exports.getExportSource =
  exports.getImportSource =
  exports.getRequireSource =
  exports.getParserOptions =
  exports.isEmpty =
    void 0
/* eslint-disable @typescript-eslint/no-explicit-any */
var pluginutils_1 = require('@rollup/pluginutils')
var estree_walker_1 = require('estree-walker')
var magic_string_1 = __importDefault(require('magic-string'))
var NodeType
;(function (NodeType) {
  NodeType['Literal'] = 'Literal'
  NodeType['CallExpression'] = 'CallExpression'
  NodeType['Identifier'] = 'Identifier'
  NodeType['ImportDeclaration'] = 'ImportDeclaration'
  NodeType['ExportNamedDeclaration'] = 'ExportNamedDeclaration'
  NodeType['ExportAllDeclaration'] = 'ExportAllDeclaration'
})(NodeType || (NodeType = {}))
function isEmpty(array) {
  return !array || array.length === 0
}
exports.isEmpty = isEmpty
var defaultParserOptions = {
  ecmaVersion: 2017,
  sourceType: 'module',
}
function getParserOptions(options) {
  if (!options) {
    return defaultParserOptions
  }
  return __assign(__assign({}, defaultParserOptions), options)
}
exports.getParserOptions = getParserOptions
function getRequireSource(node) {
  if (node.type !== NodeType.CallExpression) {
    return false
  }
  if (node.callee.type !== NodeType.Identifier || isEmpty(node.arguments)) {
    return false
  }
  var args = node.arguments
  if (node.callee.name !== 'require' || args[0].type !== NodeType.Literal) {
    return false
  }
  return args[0]
}
exports.getRequireSource = getRequireSource
function getImportSource(node) {
  if (node.type !== NodeType.ImportDeclaration || node.source.type !== NodeType.Literal) {
    return false
  }
  return node.source
}
exports.getImportSource = getImportSource
function getExportSource(node) {
  var exportNodes = [NodeType.ExportAllDeclaration, NodeType.ExportNamedDeclaration]
  if (!exportNodes.includes(node.type) || !node.source || node.source.type !== NodeType.Literal) {
    return false
  }
  return node.source
}
exports.getExportSource = getExportSource
function rewrite(input, map) {
  return map(input)
}
exports.rewrite = rewrite
function singleRename(options) {
  var bundle = options.bundle,
    file = options.file,
    key = options.key,
    context = options.context
  var filter = (0, pluginutils_1.createFilter)(options.include, options.exclude)
  if (!filter(file.facadeModuleId)) {
    return
  }
  file.facadeModuleId = rewrite(file.facadeModuleId, options.map) || file.facadeModuleId
  file.fileName = rewrite(file.fileName, options.map) || file.fileName
  file.imports.map(function (imported) {
    if (!filter(imported)) {
      return imported
    }
    return rewrite(imported, options.map) || imported
  })
  if (file.code) {
    var magicString_1 = new magic_string_1.default(file.code)
    var ast = context.parse(file.code, getParserOptions(options.parserOptions))
    ;(0, estree_walker_1.walk)(ast, {
      enter: function (node) {
        if (
          [
            NodeType.ImportDeclaration,
            NodeType.CallExpression,
            NodeType.ExportAllDeclaration,
            NodeType.ExportNamedDeclaration,
          ].includes(node.type)
        ) {
          var req = getRequireSource(node) || getImportSource(node) || getExportSource(node)
          if (req) {
            var start = req.start,
              end = req.end
            var newPath = rewrite(req.value, options.map)
            magicString_1.overwrite(start, end, "'".concat(newPath, "'"))
          }
        }
      },
    })
    if (options.sourceMap !== false) {
      file.map = magicString_1.generateMap()
    }
    file.code = magicString_1.toString()
  }
  delete bundle[key]
  bundle[rewrite(key, options.map) || key] = file
}
function rename(mappings) {
  return {
    name: 'rename-rollup',
    generateBundle: function (_, bundle) {
      var files = Object.entries(bundle)
      for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var _a = files_1[_i],
          key = _a[0],
          file = _a[1]
        for (var _b = 0, mappings_1 = mappings; _b < mappings_1.length; _b++) {
          var options = mappings_1[_b]
          singleRename(__assign({ context: this, bundle: bundle, key: key, file: file }, options))
        }
      }
    },
  }
}
exports.rename = rename
