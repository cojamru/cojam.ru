'use strict'

var debugMode = false

var elemSizes = elem => elem.getBoundingClientRect()

var pageInfo = { title: document.title, URL: location.pathname }

var metaVars = {
	siteVersion:  getInfoFromMeta('version'),
	primeColor:   getInfoFromMeta('prime-color'),
	CDNlink:      getInfoFromMeta('cdn-link')
}

var CDNpaths = {
	music: {
		covers: `https://${metaVars.CDNlink}/music/covers`
	},

	games: {
		posters: `https://${metaVars.CDNlink}/games/posters`
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
