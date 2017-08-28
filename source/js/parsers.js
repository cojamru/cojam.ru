'use strict'

var createHeading = (text => $create.elem('h2', text))

var generateLikely = ((container, options) => {
	if (!options || !container.nodeName) return;

	let
		likelyElem = $create.elem('div', '', 'likely'),
		likelySocs = {
			vk: $create.elem('div', 'Поделиться', 'vkontakte'),
			tg: $create.elem('div', 'Рассказать', 'telegram'),
			tw: $create.elem('div', 'Твитнуть', 'twitter'),
			fb: $create.elem('div', 'Шернуть', 'facebook')
		}

	if (options.URL) likelyElem.dataset.url = `${location.protocol}//${location.hostname}/${options.URL}`
	if (options.title) {
		let heading = options.heading ? `${options.heading} "${options.title}"` : options.title
		likelyElem.dataset.title = heading
		likelySocs.vk.dataset.description = heading
		likelySocs.tg.dataset.text = heading
	}

	Object.keys(likelySocs).forEach(soc => likelyElem.appendChild(likelySocs[soc]))

	container.appendChild(likelyElem)
	setTimeout(likely.initiate, 0)
})

var showMore = ((data, options) => {
	if (!data.nodeName) return;
	if (!options) options = {}

	let
		body = document.body,
		dialog = $create.elem('dialog', '', 'more'),
		dialonContainer = $create.elem('div', '', 'more--container'),
		dialogContent = data.cloneNode(true),
		dialogCloseBtn = $create.elem('button', '🗙', 'more--close'),
		dialogURL = `${pageInfo.URL.replace('/', '')}?show=${options.id}`

	body.classList.add('more-is-open')

	history.pushState('', pageInfo.title, dialogURL)

	//dialogCloseBtn.setAttribute('title', 'Закрыть')
	dialogCloseBtn.addEventListener('click', () => {
		if (location.search != '') history.pushState('', pageInfo.title, pageInfo.URL)
		body.classList.remove('more-is-open')
		dialog.remove()
	})

	dialogContent.classList.add('more--content')
	dialonContainer.appendChild(dialogContent)

	generateLikely(dialonContainer, { title: options.title, URL: dialogURL, heading: options.heading })

	dialog.appendChild(dialogCloseBtn)
	dialog.appendChild(dialonContainer)
	body.appendChild(dialog)
})

var $parser = {
	music: (data, container) => {
		container.textContent = ''

		let parseTrack = (track => {
			if (!track) return;

			let
				trackContainer = $create.elem('div', '', 'music__track'),
				trackData = { artist: (track.artist ? track.artist : 'Cojam'), title: (track.title ? track.title : 'Без названия'), link: (track.link ? track.link : false) },
				trackFeat = false

			if (track.feat) {
				trackFeat = ' (ft. '
				track.feat.forEach((person, i) => {
						trackFeat += `${person}${(i == track.feat.length - 1) ? ')' : ', '}`
				})
			}

			trackContainer.appendChild($create.elem('p', `${trackData.artist} &ndash; ${trackData.title}${trackFeat ? trackFeat : ''}`))

			return trackContainer
		})

		let generateMore = ((album, heading) => {
			let
				albumMoreContent = $create.elem('div', '', 'more__music'),
				albumMoreHeading = `${heading} <q>${album.title}</q>`,
				albumMoreDes = $create.elem('div', '', 'more__music--description'),
				albumFeat = false, albumTrackList = '', albumEmbed = ''

			if (album.feat) {
				albumFeat = ' при участии '
				album.feat.forEach((person, i) => {
					let personID = person.nick
					if (person.link) personID = $create.link(person.link, person.nick, ['html', 'e'])
					albumFeat += `${personID}${(i == album.feat.length - 1) ? '.' : ', '}`
				})
			}

			albumMoreContent.appendChild($create.elem('h2', albumMoreHeading))

			if (album.cover && album.cover.small && album.cover.small != '') {
				let img = $create.elem('img')
				img.setAttribute('src', album.cover.small)
				albumMoreDes.appendChild(img)
			}

			albumMoreDes.appendChild($create.elem('p', `Исполнител${(album.feat) ? 'и' : 'ь'}: ${album.artist ? album.artist : 'Cojam'}${albumFeat ? albumFeat : ''}`))

			if (album.description) albumMoreDes.appendChild($create.elem('p', `Описание: ${album.description}`))
			if (album.release) albumMoreDes.appendChild($create.elem('p', `Релиз: ${album.release}`))

			albumMoreContent.appendChild(albumMoreDes)

			if (album.tracklist && !isEdge) {
				albumTrackList = $create.elem('details', '', 'more__music--tracklist')
				albumTrackList.appendChild($create.elem('summary', 'Треклист'))
				album.tracklist.forEach(track => {
					albumTrackList.appendChild(parseTrack(track))
				})
				albumMoreContent.appendChild(albumTrackList)
			}

			if (album.links && album.links.embed != '') {
				albumEmbed = $create.elem('iframe', '', 'more__music--embed')
				albumEmbed.setAttribute('src', album.links.embed)
				albumMoreContent.appendChild(albumEmbed)
			}

			return albumMoreContent
		})

		let parseAlbum = (album => {
			if (!album) return;

			let
				albumContainer = $create.elem('div', '', 'music__album'),
				albumAbout = $create.elem('div', '', 'music__album--about'),
				albumBack = $create.elem('div', '', 'music__album--background'),
				albumID = album.id ? album.id : album.title.toLowerCase().replace(' ', '-'),
				albumHeading = ''

			if (album.cover && album.cover.big && album.cover.big != '') albumBack.style.backgroundImage = `url('${album.cover.big}')`

			switch (album.type) {
				case 'ep':
					albumHeading = 'EP'; break
				case 'game_ost':
					albumHeading = 'Саундтрек игры'; break
				default:
					albumHeading = 'Альбом'
			}

			var showMoreWF = () => showMore(generateMore(album, albumHeading), { heading: albumHeading, id: albumID, title: album.title })

			albumContainer.onclick = () => showMoreWF()
			if ($check.get('show') == albumID) showMoreWF()

			albumAbout.appendChild($create.elem('h3', album.title))
			albumAbout.appendChild($create.elem('p', `Треков в альбоме: ${album.tracklist.length}`))

			albumContainer.appendChild(albumBack)
			albumContainer.appendChild(albumAbout)

			return albumContainer
		})

		//container.appendChild(createHeading('Альбомы'))
		data.albums.forEach(album => container.appendChild(parseAlbum(album)))
	},
	games: (data, container) => {
		container.textContent = ''

		let generateMore = ((game, heading) => {
			let
				gameMoreContent = $create.elem('div', '', 'more__game'),
				gameMoreHeading = `${heading} <q>${game.title}</q>`,
				gameMoreDes = $create.elem('div', '', 'more__game--description'),
				gameMoreLinks = $create.elem('ul', '', 'more__game--links'),
				gameMorePlatform = 'Платформа: '

			gameMoreContent.appendChild($create.elem('h2', gameMoreHeading))

			switch (game.platform) {
				case 'flash':
					gameMorePlatform += 'Flash'; break
				case 'pc':
					gameMorePlatform += 'PC'; break
				case 'html':
					gameMorePlatform += 'браузерная игра'; break
				default:
					gameMorePlatform = false
			}

			if (game.contest && game.contest.name && game.contest.name != '') {
				let contest = (game.contest.link && game.contest.link != '') ? $create.link(game.contest.link, game.contest.name, ['e', 'html']) : game.contest.name

				gameMoreDes.appendChild($create.elem('p', `Игра сделана для конкурса <q>${contest}</q>.`))
			}

			if (game.description) gameMoreDes.appendChild($create.elem('p', `Описание: ${game.description}`))

			if (gameMorePlatform) gameMoreDes.appendChild($create.elem('p', gameMorePlatform))

			gameMoreContent.appendChild(gameMoreDes)

			if (game.description_more && game.description_more != '' && !isEdge) {
				let desMore = $create.elem('details', '', 'more__game--description-more')
				desMore.appendChild($create.elem('summary', 'Подробное описание'))
				desMore.appendChild($create.elem('p', game.description_more.replace(/\n/g, '<br>')))
				console.log('asd')
				gameMoreContent.appendChild(desMore)
			}

			if (game.links && Object.keys(game.links).length != 0) {
				if (game.links.play && game.links.play != '') gameMoreLinks.appendChild($create.elem('li', $create.link(game.links.play, 'Играть онлайн', ['html'])))
				if (game.links.dl && game.links.dl != '') gameMoreLinks.appendChild($create.elem('li', $create.link(game.links.dl, 'Скачать', ['e', 'html'])))
				if (game.links.site && game.links.site != '') gameMoreLinks.appendChild($create.elem('li', $create.link(game.links.site, 'Сайт игры', ['html'])))

				gameMoreContent.appendChild(gameMoreLinks)
			}

			return gameMoreContent
		})

		let parseGame = (game => {
			let
				gameContainer = $create.elem('div', '', 'games__game'),
				gameRelease = $create.elem('div', '', 'games__game--release'),
				gamePoster = $create.elem('div', '', 'games__game--poster'),
				gameID = game.id ? game.id : game.title.toLowerCase().replace(' ', '-'),
				gameHeading = 'Игра'

			if (game.img && game.img.poster && game.img.poster != '') gamePoster.style.backgroundImage = `url('${game.img.poster}')`

			var showMoreWF = () => showMore(generateMore(game, gameHeading), { heading: gameHeading, id: gameID, title: game.title })

			gameContainer.onclick = () => showMoreWF()
			if ($check.get('show') == gameID) showMoreWF()

			gameContainer.appendChild(gamePoster)

			if (game.release && game.release != '') {
				gameRelease.textContent = game.release
				gameContainer.appendChild(gameRelease)
			}

			return gameContainer
		})

		//container.appendChild(createHeading('Игры'))
		data.our.forEach(game => container.appendChild(parseGame(game)))
	}
}
