import { getInfoFromMeta } from './special/info-from-meta';

import { $make } from './kamina';

const IS_DEV_MODE = process.env.NODE_ENV === 'development';

const elemSizes = elem => elem.getBoundingClientRect();

export const INFO = {
	pages: {
		index: `/${IS_DEV_MODE ? 'index.html' : ''}`,
		music: `/music${IS_DEV_MODE ? '.html' : ''}`,
		games: `/games${IS_DEV_MODE ? '.html' : ''}`,
	},

	current_page: {
		title: document.title,
		URL: location.pathname,
	},

	meta: {
		site_version: getInfoFromMeta('version'),
		prime_color: getInfoFromMeta('prime-color'),
		CDN_link: getInfoFromMeta('cdn-link'),
	},
};

INFO.CDN_paths = {
	music: {
		covers: `${INFO.meta.CDN_link}/music/covers`,
	},

	games: {
		posters: `${INFO.meta.CDN_link}/games/posters`,
	},
};

document.addEventListener('DOMContentLoaded', () => {
	const header = $make.qs('header');

	if (IS_DEV_MODE) {
		const menuItems = $make.qsf('header nav a[href^="./"]', header, ['a']);
		for (let menuItem of menuItems) {
			menuItem.setAttribute('href', menuItem.getAttribute('href') + '.html');
		}
	}

	void (() => {
		const headerWidth = elemSizes(header).width;

		const menu = $make.qsf('nav', header);
		const menuLinks = $make.qsf('nav a', menu, ['a']);

		let menuLinksWidth = Array.from(menuLinks).reduce((acc, linkNode) => {
			acc += elemSizes(linkNode).width;
			return acc;
		}, 0);

		if (menuLinksWidth >= headerWidth) {
			menu.classList.add('not-inline');
		}
	})();
});
