'use strict';

void (() => {
	let doc = document;

	let qs = qs => doc.querySelector(qs);

	let undefinedBlock = qs('section[data-error="undefined"]');

	if (self != top) {
		undefinedBlock.style.display = 'initial';
		return;
	}

	fetch(doc.URL).then(response => {
		let status = response.status;

		doc.title = `Ошибка ${status} – ${doc.title}`;

		switch (status) {
			case 403:
			case 404:
				qs(`section[data-error='${status}']`).style.display = 'initial';
				break;
			case 200:
			default:
				undefinedBlock.style.display = 'initial';
				break;
		}
	});
})();
