const fs = require('node:fs')
const os = require('node:os')

const jsYaml = require('js-yaml')

const parseYAMLfile = fileName => jsYaml.load(fs.readFileSync(`./${fileName}.yaml`, 'utf8'))

const writeJsonFile = (fileName, obj) => fs.writeFileSync(fileName, JSON.stringify(obj) + os.EOL)

module.exports = { parseYAMLfile, writeJsonFile }
