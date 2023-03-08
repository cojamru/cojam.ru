export const $make = {
	qs: (selector, options = []) => {
		return options.includes('a')
			? document.querySelectorAll(selector)
			: document.querySelector(selector);
	},

	qsf: (selector, from, options = []) => {
		if (!from.nodeName) {
			from = document.querySelector(from);
		}

		return options.includes('a') ? from.querySelectorAll(selector) : from.querySelector(selector);
	},

	safe: value =>
		value
			.toString()
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/'/g, '&#39;')
			.replace(/"/g, '&#34;'),
};

export const $create = {
	elem: (what = '', content = '', classes = '', options = []) => {
		let elem = document.createElement(what);

		if (classes != '') {
			elem.className = classes;
		}

		if (content != '') {
			elem.innerHTML = options.includes('s') ? $make.safe(content) : content;
		}

		return options.includes('html') ? elem.outerHTML : elem;
	},

	link: (url = 'javascript:void(0)', content = '', classes = '', options = []) => {
		let link = document.createElement('a');

		link.setAttribute('href', url);

		if (url.startsWith('http')) {
			link.setAttribute('target', '_blank');
		}

		if (options.includes('e')) {
			link.setAttribute('rel', 'nofollow noopener');
		}

		if (classes != '') {
			link.className = classes;
		}

		if (content != '') {
			link.innerHTML = options.includes('s') ? $make.safe(content) : content;
		}

		return options.includes('html') ? link.outerHTML : link;
	},

	text: content => document.createTextNode(content),
};

export const $check = {
	get: value => {
		let params = new URLSearchParams(location.search);

		return params.get(value) == '' ? true : params.get(value);
	},
};

export const $storage = {
	getType: (options = []) => (options.includes('s') ? sessionStorage : localStorage),

	get(item, options) {
		return this.getType(options).getItem(item);
	},

	set(item, value, options) {
		return this.getType(options).setItem(item, value);
	},

	rm(item, options) {
		return this.getType(options).removeItem(item);
	},

	test() {
		let test = `$s_${Math.random()}`;

		try {
			this.set(test, test);
			this.rm(test);
			return true;
		} catch (e) {
			return false;
		}
	},
};

export const $ls = $storage; // for backward compatibility with older versions
