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

;(()=>{
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

	let
		header = $make.qs('header'),
		menu = header.querySelector('nav'),
		headerSizes = elemSizes(header),
		menuSizes = elemSizes(menu)

	if (menuSizes.width >= headerSizes.width - 20) {
		menu.classList.add('not-inline')
	}
})()
