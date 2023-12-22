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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {}
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]]
      }
    return t
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.stylelint = void 0
var pluginutils_1 = __importDefault(require('@rollup/pluginutils'))
var node_path_1 = __importDefault(require('node:path'))
var stylelint_1 = require('stylelint')
function resultHasErrors(result) {
  return result.results.some(function (res) {
    return res.errored
  })
}
function resultHasWarnings(result) {
  return result.results.some(function (res) {
    return res.warnings.length !== 0
  })
}
function normalizePath(id) {
  return node_path_1.default.relative(process.cwd(), id).split(node_path_1.default.sep).join('/')
}
function stylelint(_a) {
  if (_a === void 0) {
    _a = {}
  }
  var include = _a.include,
    _b = _a.exclude,
    exclude = _b === void 0 ? 'node_modules/**' : _b,
    _c = _a.formatter,
    formatter = _c === void 0 ? 'string' : _c,
    throwOnError = _a.throwOnError,
    throwOnWarning = _a.throwOnWarning,
    options = __rest(_a, ['include', 'exclude', 'formatter', 'throwOnError', 'throwOnWarning'])
  var filter = pluginutils_1.default.createFilter(include, exclude || 'node_modules/**')
  return {
    name: 'stylelint',
    transform: function (code, id) {
      if (!filter(id)) return
      return (0, stylelint_1.lint)(
        __assign({ code: code, codeFilename: normalizePath(id), formatter: formatter }, options)
      )
        .then(function (result) {
          if (!result.output) {
            return
          }
          process.stdout.write(result.output)
          if (resultHasWarnings(result) && throwOnWarning) {
            throw new Error('Warning(s) were found')
          }
          if (resultHasErrors(result) && throwOnError) {
            throw new Error('Error(s) were found')
          }
        })
        .catch(function (error) {
          throw Error(error)
        })
    },
  }
}
exports.stylelint = stylelint
