const fs = require('fs')
const path = require('path')

const baseDir = path.resolve(__dirname, '..', '..', 'dist')

const whiteListDirs = [/_virtual/]

const replacements = [{ source: /node_modules/gm, replacement: 'dependencies' }]

const exploreDir = (baseDir) => {
  fs.readdirSync(baseDir, { withFileTypes: true }).forEach((item) => {
    if (item.isDirectory()) {
      exploreDir(path.resolve(baseDir, item.name))
    } else if (item.isFile()) {
      if (whiteListDirs.some((pattern) => pattern.test(path.resolve(baseDir, item.name))))
        applyReplaces(path.resolve(baseDir, item.name))
    }
  })
}

const applyReplaces = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8')
  fs.writeFileSync(
    filePath,
    replacements.reduce((output, { source, replacement }) => output.replace(source, replacement), data)
  )
}

exploreDir(baseDir)
