'use strict'

let debugMode = false

let elemSizes = elem => elem.getBoundingClientRect()

let pageInfo = {
	title: document.title,
	URL: location.pathname
}

let metaVars = {
	siteVersion:  getInfoFromMeta('version'),
	primeColor:   getInfoFromMeta('prime-color'),
	CDNlink:      getInfoFromMeta('cdn-link')
}

let CDNpaths = {
	music: {
		covers: `${metaVars.CDNlink}/music/covers`
	},

	games: {
		posters: `${metaVars.CDNlink}/games/posters`
	}
}

document.addEventListener('DOMContentLoaded', () => {
	let menuItems = $make.qs('header nav a[href^="/"]', ['a'])

	if (isEdge) { document.body.dataset.edge = '' }

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
		let header = $make.qs('header')

		let headerWidth = elemSizes(header).width

		let menu = $make.qsf('nav', header)

		let menuLinks = $make.qsf('nav a', menu, ['a'])

		let menuLinksWidth = 0

		menuLinks.forEach(link =>
			menuLinksWidth += elemSizes(link).width
		)

		if (menuLinksWidth >= headerWidth) {
			menu.classList.add('not-inline')
		}
	})()
})
