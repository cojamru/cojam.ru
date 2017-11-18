'use strict'

var
	elemSizes = elem => elem.getBoundingClientRect(),
	debugMode = false,
	siteVersion = document.head.querySelector('meta[name="cojam-version"]').getAttribute('content'),
	pageInfo = {
		title: document.title,
		URL: location.pathname
	}

var sitePaths = {
	musicCovers: '/assets/img/music',
	games: {
		posters: '/assets/img/games/posters',
		shots: '/assets/img/games/shots'
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
		if (item.href.replace('.html', '') == location.href.replace('.html', '')) { item.classList.add('current') }
		if (debugMode) { item.setAttribute('href', item.getAttribute('href') + '.html') }
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
