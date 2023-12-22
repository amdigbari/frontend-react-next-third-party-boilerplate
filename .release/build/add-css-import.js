const fs = require('fs')
const path = require('path')

// NOTE: Base URL may change based on the output of the third-party.
// It depends on whether the output generates in the src directory inside the dist or not.

// NOTE: This file add the import line for extracted css files into the appropriate js file.
const mainDirs = [
  path.join(__dirname, '../../dist/esm'),
  // NOTE: No cjs copy because cjs uses inject mode
]

const parseFileToFindCSSImport = (content, dir) => {
  const imports = content
    .match(/(?=import .*? from ').+(?<=')/g)
    ?.map((i) => i.replace(/import .*? from '/, '').replace(/'$/, ''))

  const cssImports = imports
    ?.filter((text) => text.match(/module\.scss\.js$/))
    .map((text) => {
      /**
       * In here we are looking for [name].module.scss.css import at first
       * If it didn't exist, we are looking for [name].component.css import
       * If it didn't exist either, we look for [name].css import at last
       * If even that didn't exist, we ignore the css import
       */
      try {
        fs.readFileSync(path.join(dir, text.replace(/js$/, 'css')))

        return text.replace(/js$/, 'css')
      } catch {
        try {
          fs.readFileSync(path.join(dir, text.replace(/module\.scss\.js$/, 'component.css')))

          return text.replace(/module\.scss\.js$/, 'component.css')
        } catch {
          try {
            fs.readFileSync(path.join(dir, text.replace(/module\.scss\.js$/, 'css')))

            return text.replace(/module\.scss\.js$/, 'css')
          } catch {
            return undefined
          }
        }
      }
    })
    .filter(Boolean)

  return cssImports
}

const parseDirForCSSFiles = (dir, parent) => {
  const stat = fs.statSync(dir)
  if (stat.isDirectory()) {
    fs.readdirSync(dir).forEach((file) => parseDirForCSSFiles(path.join(dir, file), dir))
  } else if (stat.isFile()) {
    if (dir.match(/.*\.js$/)) {
      //   NOTE: This means the file is Js file and we excluded .{module,export}.scss.js/index.js files
      const content = fs.readFileSync(dir, { encoding: 'utf8' })

      const cssImports = parseFileToFindCSSImport(content, parent)
      cssImports && fs.writeFileSync(dir, `${cssImports.map((i) => `import '${i}'`).join('\n')}\n${content}`)
    }
  }
}

const parseMainDirectory = (mainDirs) => {
  mainDirs.forEach((dir) => {
    fs.readdirSync(dir).forEach((file) => parseDirForCSSFiles(path.join(dir, file), dir))
  })
}

parseMainDirectory(mainDirs)
