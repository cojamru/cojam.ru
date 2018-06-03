'use strict'

void (() => {
	let qs = qs => document.querySelector(qs)

	let undefinedBlock = qs('section[data-error="undefined"]')

	if (self != top) { undefinedBlock.style.display = 'initial'; return }

	qs('section[data-error="404"] a[href*="old"]').href += location.pathname

	fetch(document.URL)
		.then(response => {
			let status = response.status

			document.title = `Ошибка ${status} – ${document.title}`

			switch (status) {
				case 403:
				case 404:
					qs(`section[data-error='${status}']`).style.display = 'initial'; break
				case 200:
				default:
					undefinedBlock.style.display = 'initial'; break
			}
		})
})()
