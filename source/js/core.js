'use strict'

var
	elemSizes = elem => elem.getBoundingClientRect(),
	debugMode = false,
	siteVersion = getInfoFromMeta('version'),
	pageInfo = {
		title: document.title,
		URL: location.pathname
	},
	pathToImages = getInfoFromMeta('img-path')

var sitePaths = {
	musicCovers: `${pathToImages}/music`,
	games: {
		posters: `${pathToImages}/games/posters`,
		shots: `${pathToImages}/games/shots`
	}
}

document.addEventListener('DOMContentLoaded', () => {
	let
		currentLoc = location.pathname.replace('.html', ''),
		menuItems = $make.qs('header nav a[href^="/"]', ['a'])

	switch (location.hostname) {
		case '127.0.0.1':
		case 'localhost':
			debugMode = true; break
	}

	Array.from(menuItems).forEach(item => {
		if (item.href.replace('.html', '') == location.href.replace('.html', '')) {
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
