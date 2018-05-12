'use strict'

var debugMode = false

var elemSizes = elem => elem.getBoundingClientRect()

var pageInfo = { title: document.title, URL: location.pathname }

var
	siteVersion = getInfoFromMeta('version'),
	pathToImages = getInfoFromMeta('img-path')

var sitePaths = {
	musicCovers: `${pathToImages}/music`,
	games: {
		posters: `${pathToImages}/games/posters`,
		shots: `${pathToImages}/games/shots`
	}
}

document.addEventListener('DOMContentLoaded', () => {
	let menuItems = $make.qs('header nav a[href^="/"]', ['a'])

	switch (location.hostname) {
		case '127.0.0.1':
		case 'localhost':
			debugMode = true; break
	}

	Array.from(menuItems).forEach(item => {
		if (item.getAttribute('href').replace('.html', '') == location.pathname.replace('.html', '')) {
			item.classList.add('current')
		}

		if (debugMode) {
			item.setAttribute('href', item.getAttribute('href') + '.html')
		}
	})

	void (() => {
		let
			header =  $make.qs('header'),
			menu =    $make.qsf('nav', header)

		let
			headerSizes =  elemSizes(header),
			menuSizes =    elemSizes(menu)

		if (menuSizes.width >= headerSizes.width - 20) {
			menu.classList.add('not-inline')
		}
	})()
})
