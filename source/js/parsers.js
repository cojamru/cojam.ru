'use strict'

let createHeading = text => $create.elem('h2', text)

let generateLikely = ({ container, options = { title = '', URL = '', heading = '', image: '' } }) => {
	if (!container.nodeName) { return }

	let likelyElem = $create.elem('div', '', 'likely')

	let likelySocs = {
		vk: $create.elem('div', 'Поделиться', 'vkontakte'),
		tg: $create.elem('div', 'Рассказать', 'telegram'),
		tw: $create.elem('div', 'Твитнуть', 'twitter'),
		fb: $create.elem('div', 'Шернуть', 'facebook')
	}

	if ('URL' in options) {
		likelyElem.dataset.url = `${location.origin}/${options.URL}`
	}

	if ('title' in options) {
		let _heading = options.heading
			? `${options.heading} "${options.title}"`
			: options.title

		likelyElem.dataset.title = _heading
		likelySocs.vk.dataset.description = _heading
		likelySocs.tg.dataset.text = _heading

		let _image = options.image ? options.image : ''

		if (_image) {
			likelySocs.vk.dataset.image = _image
		}
	}

	Object.keys(likelySocs).forEach(soc =>
		likelyElem.appendChild(likelySocs[soc])
	)

	container.appendChild(likelyElem)
	setTimeout(likely.initiate, 0)
}

let showPopup = ({ content, options = { heading = '', id = '', title = '', image = '' } }) => {
	if (!content.nodeName) { return }

	let popup = $create.elem('div', '', 'popup')

	let popupContainer = $create.elem('div', '', 'popup--container')

	let popupURL = `${pageInfo.URL.replace('/', '')}?show=${options.id}`

	history.pushState('', pageInfo.title, popupURL)

	let closePopup = () => {
		if (location.search != '') {
			history.pushState('', pageInfo.title, pageInfo.URL)
		}

		popup.remove()
	}

	let popupCloseBtn = $create.elem('button', '🗙', 'popup--close')

	//popupCloseBtn.setAttribute('title', 'Закрыть')

	popupCloseBtn.addEventListener('click', () => closePopup())

	popup.appendChild(popupCloseBtn)

	let popupContent = content.cloneNode(true)

	popupContent.classList.add('popup--content')

	popupContainer.appendChild(popupContent)

	generateLikely({
		container: popupContainer,
		options: {
			title:    options.title,
			URL:      popupURL,
			heading:  options.heading,
			image:    options.image
		}
	})

	popup.appendChild(popupContainer)

	document.body.appendChild(popup)
}

let $parser = {
	music: ({ data = {}, container }) => {
		container.textContent = ''

		let parseTrack = ({ track = {}, albumArtist = 'Cojam' }) => {
			if (!track) { return }

			let trackContainer = $create.elem('div', '', 'popup__music--track')

			let trackData = {
				artist:  (track.artist  ? track.artist :  albumArtist),
				title:   (track.title   ? track.title :   'Без названия'),
				link:    (track.link    ? track.link :    false)
			}

			let trackFeat = ''

			if ('feat' in track) {
				trackFeat = ' (ft. '
				track.feat.forEach((person, i) => {
					trackFeat += `${person}${(i == track.feat.length - 1) ? ')' : ', '}`
				})
			}

			trackContainer.appendChild($create.elem(
				'p',
				`${trackData.artist} &ndash; ${trackData.title}${trackFeat ? trackFeat : ''}`
			))

			if ('description' in track && track.description != '') {
				trackContainer.appendChild($create.elem(
					'p',
					`${track.description.replace(/\n/g, '<br>')}`,
					'popup__music--track-info'
				))
			}

			return trackContainer
		}

		let generatePopup = ({ album = {}, heading = '' }) => {
			let albumPopupContent = $create.elem('div', '', 'popup__music')

			let albumPopupHeading = `${heading} <q>${album.title}</q>`

			let albumFeat = ''

			if ('feat' in album) {
				albumFeat = ' при участии '
				album.feat.forEach((person, i) => {
					let personID = person.nick

					if ('link' in person) {
						personID = $create.link(person.link, person.nick, '', ['html', 'e'])
					}

					albumFeat += `${personID}${(i == album.feat.length - 1) ? '.' : ', '}`
				})
			}

			albumPopupContent.appendChild($create.elem('h2', albumPopupHeading))

			let albumPopupDes = $create.elem('div', '', 'popup__music--description')

			if ('img' in album && 'thumb' in album.img && album.img.thumb != '') {
				let img = $create.elem('img')

				img.setAttribute('src', `${album.img.thumb}?v=${metaVars.siteVersion}`)

				albumPopupDes.appendChild(img)
			}

			let albumArtist = album.artist
				? album.artist
				: 'Cojam'

			albumPopupDes.appendChild($create.elem(
				'p',
				`<b>Исполнител${(album.feat) ? 'и' : 'ь'}</b>: ${albumArtist}${albumFeat ? albumFeat : ''}`
			))

			if ('description' in album) {
				albumPopupDes.appendChild($create.elem('p', `<b>Описание</b>: ${album.description.replace(/\n/g, '<br>')}`))
			}

			if ('release' in album) {
				albumPopupDes.appendChild($create.elem('p', `<b>Релиз</b>: ${album.release}`))
			}

			albumPopupContent.appendChild(albumPopupDes)

			let albumTrackList = $create.elem('details', '', 'popup__music--tracklist')

			if ('tracklist' in album && album.tracklist.length != 0) {
				albumTrackList.appendChild($create.elem('summary', 'Треклист'))

				album.tracklist.forEach(track => {
					albumTrackList.appendChild(parseTrack({ track: track, albumArtist: albumArtist }))
				})

				albumPopupContent.appendChild(albumTrackList)
			}

			let albumEmbed = $create.elem('iframe', '', 'popup__music--embed')

			if ('embed' in album && album.embed.type != '') {
				let albumEmbedSrc = 'https://'

				let albumEmbedSrcID = Number(album.embed.ID)

				let _color = metaVars.primeColor.replace('#', '')

				let _user = album.embed.user
					? album.embed.user
					: 'team@cojam.ru'

				switch (album.embed.type) {
					case 'bc':
						albumEmbedSrc += `bandcamp.com/EmbeddedPlayer/album=${albumEmbedSrcID}/size=large/bgcol=ffffff/linkcol=${_color}/artwork=none/transparent=true`; break
					case 'sc':
						albumEmbedSrc += `w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${albumEmbedSrcID}&color=${_color}`; break
					case 'ym':
						albumEmbedSrc += `music.yandex.ru/iframe/#playlist/${_user}/${albumEmbedSrcID}/hide/cover/title/`; break
				}

				albumEmbed.setAttribute('src', albumEmbedSrc)
				albumPopupContent.appendChild(albumEmbed)
			}

			return albumPopupContent
		}

		let parseAlbum = (album = {}) => {
			let
				albumContainer =  $create.elem('div', '', 'music__album'),
				albumAbout =      $create.elem('div', '', 'music__album--about'),
				albumCover =      $create.elem('img', '', 'music__album--cover')

			let albumID = album.id
				? album.id
				: album.title.toLowerCase().replace(' ', '-')

			let albumCoverLink = ''

			if ('img' in album && 'cover' in album.img && album.img.cover != '') {
				albumCoverLink = `${album.img.cover}?v=${metaVars.siteVersion}`

				albumCover.src = albumCoverLink
				albumCover.alt = `${albumID} cover`
			}

			let albumHeading = ''

			switch (album.type) {
				case 'ep':
					albumHeading = 'EP'; break
				case 'game_ost':
					albumHeading = 'Саундтрек игры'; break
				default:
					albumHeading = 'Альбом'
			}

			let showPopupWF = () => showPopup({
				content: generatePopup({ album: album, heading: albumHeading }),
				options: {
					heading: albumHeading,
					id: albumID,
					title: album.title,
					image: albumCoverLink
				}
			})

			albumContainer.onclick = () => showPopupWF()
			if ($check.get('show') == albumID) { showPopupWF() }

			albumAbout.appendChild($create.elem('h3', album.title))
			albumAbout.appendChild($create.elem('p', `Треков в альбоме: ${album.tracklist.length}`))

			if (!$check.get('disable-images')) {
				albumContainer.appendChild(albumCover)
			}

			albumContainer.appendChild(albumAbout)

			return albumContainer
		}

		data.albums.forEach(album => container.appendChild(parseAlbum(album)))
	},

	games: ({ data = {}, container }) => {
		container.textContent = ''

		let generatePopup = ({ game = {}, heading = '' }) => {
			let gamePopupContent = $create.elem('div', '', 'popup__game')

			let gamePopupHeading = `${heading} <q>${game.title}</q>`

			gamePopupContent.appendChild($create.elem('h2', gamePopupHeading))

			let gamePopupPlatform = '<b>Платформа</b>: '

			switch (game.platform) {
				case 'flash':
					gamePopupPlatform += 'Flash'; break
				case 'pc':
					gamePopupPlatform += 'PC'; break
				case 'online':
					gamePopupPlatform += 'браузерная игра'; break
				default:
					gamePopupPlatform = false
			}

			let gamePopupDes = $create.elem('div', '', 'popup__game--description')

			if ('contest' in game && 'name' in game.contest && game.contest.name != '') {
				let contest = (game.contest.link && game.contest.link != '')
					? $create.link(game.contest.link, game.contest.name, '', ['e', 'html'])
					: game.contest.name

				gamePopupDes.appendChild($create.elem('p', `Игра сделана для конкурса <q>${contest}</q>.`))
			}

			if ('description' in game) {
				gamePopupDes.appendChild($create.elem('p', `<b>Описание</b>: ${game.description}`))
			}

			if (gamePopupPlatform) {
				gamePopupDes.appendChild($create.elem('p', gamePopupPlatform))
			}

			gamePopupContent.appendChild(gamePopupDes)

			if ('description_popup' in game && game.description_popup != '') {
				let desPopup = $create.elem('details', '', 'popup__game--description-popup')
				desPopup.appendChild($create.elem('summary', 'Подробное описание'))
				desPopup.appendChild($create.elem('p', game.description_popup.replace(/\n/g, '<br>')))
				gamePopupContent.appendChild(desPopup)
			}

			let gamePopupLinks = $create.elem('ul', '', 'popup__game--links')

			if ('links' in game && Object.keys(game.links).length != 0) {
				if (game.links.play && game.links.play != '') {
					gamePopupLinks.appendChild($create.elem('li', $create.link(game.links.play, '🕹️ Играть онлайн', '', ['html'])))
				}

				if (game.links.dl && game.links.dl != '') {
					gamePopupLinks.appendChild($create.elem('li', $create.link(game.links.dl, '☁️ Скачать', '', ['e', 'html'])))
				}

				if (game.links.site && game.links.site != '') {
					gamePopupLinks.appendChild($create.elem('li', $create.link(game.links.site, '🏠 Сайт игры', '', ['html'])))
				}

				gamePopupContent.appendChild(gamePopupLinks)
			}

			return gamePopupContent
		}

		let parseGame = (game = {}) => {
			let
				gameContainer =  $create.elem('div', '', 'games__game'),
				gameTitle =      $create.elem('div', '', 'games__game--title'),
				gameRelease =    $create.elem('div', '', 'games__game--release'),
				gamePoster =     $create.elem('img', '', 'games__game--poster')

			let gameID = game.id
				? game.id
				: game.title.toLowerCase().replace(' ', '-')

			let gamePosterLink = ''

			if ('img' in game && 'poster' in game.img && game.img.poster != '') {
				gamePosterLink = `${game.img.poster}?v=${metaVars.siteVersion}`

				gamePoster.src = gamePosterLink
				gamePoster.alt = `${gameID} poster`
			}

			let gameHeading = 'Игра'

			let showPopupWF = () => showPopup({
				content: generatePopup({ game: game, heading: gameHeading }),
				options: {
					heading: gameHeading,
					id: gameID,
					title: game.title,
					image: gamePosterLink
				}
			})

			gameContainer.onclick = () => showPopupWF()
			if ($check.get('show') == gameID) { showPopupWF() }

			if (!$check.get('disable-images')) {
				gameContainer.appendChild(gamePoster)
			}

			if ('title' in game && game.title != '') {
				gameTitle.textContent = game.title
				gameContainer.appendChild(gameTitle)
			}

			if ('release' in game && game.release != '') {
				gameRelease.textContent = game.release
				gameContainer.appendChild(gameRelease)
			}

			return gameContainer
		}

		data.our.forEach(game =>
			container.appendChild(parseGame(game))
		)
	}
}
