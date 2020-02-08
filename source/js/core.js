'use strict'

const IS_DEV_MODE = location.hostname === '127.0.0.1' || location.hostname === 'localhost'

const elemSizes = elem => elem.getBoundingClientRect()

const INFO = {
	pages: {
		index: `/${IS_DEV_MODE ? 'index.html' : ''}`,
		music: `/music${IS_DEV_MODE ? '.html' : ''}`,
		games: `/games${IS_DEV_MODE ? '.html' : ''}`
	},

	current_page: {
		title: document.title,
		URL: location.pathname
	},

	meta: {
		site_version:  getInfoFromMeta('version'),
		prime_color:   getInfoFromMeta('prime-color'),
		CDN_link:      getInfoFromMeta('cdn-link')
	},
}

INFO.CDN_paths = {
	music: {
		covers: `${INFO.meta.CDN_link}/music/covers`
	},

	games: {
		posters: `${INFO.meta.CDN_link}/games/posters`
	},
}

document.addEventListener('DOMContentLoaded', () => {
	let menuItems = $make.qs('header nav a[href^="/"]', ['a'])

	if (isEdge) { document.body.dataset.edge = '' }

	Array.from(menuItems).forEach(item => {
		if (item.getAttribute('href').replace('.html', '') == location.pathname.replace('.html', '')) {
			item.classList.add('current')
		}

		if (IS_DEV_MODE) {
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
