'use strict'

;(() => {
	if (window.self != window.top) { $make.qs('.undefined').style.display = 'initial'; return }

	fetch(document.URL)
		.then(response => {
			document.title = `Ошибка ${response.status} – ${document.title}`
			switch (response.status) {
				case 403:
					$make.qs('.error-403').style.display = 'initial'; break
				case 404:
					$make.qs('.error-404').style.display = 'initial'; break
				case 200:
				default:
					$make.qs('.undefined').style.display = 'initial'
			}
		})
})()
