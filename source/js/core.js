'use strict'

var
	elemSizes = (elem => elem.getBoundingClientRect()),
	pageInfo = {
		title: document.title,
		URL: location.pathname
	}

;(()=>{
	let
		currentLoc = location.pathname.replace('.html', ''),
		menuItems = $make.qs('header nav a[href^="/"]', ['a'])

	Array.from(menuItems).forEach(item => {
		if (item.href.replace('.html', '') == location.href.replace('.html', '')) item.classList.add('current')
		if (location.hostname == '127.0.0.1' || location.hostname == 'localhost' || location.port == '8080') item.setAttribute('href', item.getAttribute('href') + '.html')
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
