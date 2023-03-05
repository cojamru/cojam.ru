const project = require('./package.json')
const { parseYAMLfile, writeJsonFile } = require('./utils')

const config = parseYAMLfile('project-config')
const vendors = parseYAMLfile('project-vendors')

const dirs = config.dirs

const pugConfig = {
	locals: {
		VERSION:     project.version,

		title:       config.title,

		domain:      config.domain,

		primeColor:  config.prime_color,

		PATHS: {
			js:       `/${dirs.assets}/js`,
			css:      `/${dirs.assets}/css`,
			img:      `/${dirs.assets}/img`,
		},

		LIBS: vendors,

		URLs: config.URLs,

		BBISWU: {
			google: config.trackers.google,
			yandex: config.trackers.yandex
		},
	}
}

writeJsonFile('.pugrc', pugConfig)
