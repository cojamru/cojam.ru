const project = require('./package.json')
const { parseYAMLfile, writeJsonFile } = require('./utils')

const config = parseYAMLfile('project-config')

const sassConfig = {
	data: `$primeColor: ${config.prime_color}; $imgPath: '../img/'; $VERSION: "${project.version}";`
}

writeJsonFile('.sassrc', sassConfig)
