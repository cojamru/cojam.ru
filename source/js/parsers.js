'use strict'

var createHeading = text => $create.elem('h2', text)

var generateLikely = ({ container, options = { title = '', URL = '', heading = '', image: '' } }) => {
	if (!container.nodeName) { return }

	let
		likelyElem = $create.elem('div', '', 'likely'),
		likelySocs = {
			vk: $create.elem('div', 'Поделиться', 'vkontakte'),
			tg: $create.elem('div', 'Рассказать', 'telegram'),
			tw: $create.elem('div', 'Твитнуть', 'twitter'),
			fb: $create.elem('div', 'Шернуть', 'facebook')
		}

	if ('URL' in options) {
		likelyElem.dataset.url = `${location.origin}/${options.URL}`
	}

	if ('title' in options) {
		let
			_heading =  options.heading ? `${options.heading} "${options.title}"` : options.title,
			_image =    options.image ? options.image : ''

		likelyElem.dataset.title = _heading
		likelySocs.vk.dataset.description = _heading
		likelySocs.tg.dataset.text = _heading

		if (_image) {
			likelySocs.vk.dataset.image = _image
		}
	}

	Object.keys(likelySocs).forEach(soc => likelyElem.appendChild(likelySocs[soc]))

	container.appendChild(likelyElem)
	setTimeout(likely.initiate, 0)
}

var showPopup = ({ content, options = { heading = '', id = '', title = '', image = '' } }) => {
	if (!content.nodeName) { return }

	let body = document.body

	let popup = $create.elem('div', '', 'popup')

	let
		popupContainer = $create.elem('div', '', 'popup--container'),
		popupContent = content.cloneNode(true),
		popupCloseBtn = $create.elem('button', '🗙', 'popup--close'),
		popupURL = `${pageInfo.URL.replace('/', '')}?show=${options.id}`

	body.dataset.popup = ''

	history.pushState('', pageInfo.title, popupURL)

	//popupCloseBtn.setAttribute('title', 'Закрыть')
	popupCloseBtn.addEventListener('click', () => {
		if (location.search != '') {
			history.pushState('', pageInfo.title, pageInfo.URL)
		}

		delete body.dataset.popup
		popup.remove()
	})

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

	popup.appendChild(popupCloseBtn)
	popup.appendChild(popupContainer)
	body.appendChild(popup)
}

var $parser = {
	music: ({ data = {}, container }) => {
		container.textContent = ''

		let parseTrack = (track = {}) => {
			if (!track) { return }

			let
				trackContainer = $create.elem('div', '', 'popup__music--track'),
				trackData = { artist: (track.artist ? track.artist : 'Cojam'), title: (track.title ? track.title : 'Без названия'), link: (track.link ? track.link : false) },
				trackDes = false,
				trackFeat = false

			if ('feat' in track) {
				trackFeat = ' (ft. '
				track.feat.forEach((person, i) => {
						trackFeat += `${person}${(i == track.feat.length - 1) ? ')' : ', '}`
				})
			}

			trackContainer.appendChild($create.elem('p', `${trackData.artist} &ndash; ${trackData.title}${trackFeat ? trackFeat : ''}`))

			if ('description' in track && track.description != '') {
				trackContainer.appendChild($create.elem('p', `${track.description.replace(/\n/g, '<br>')}`, 'popup__music--track-info'))
			}

			return trackContainer
		}

		let generatePopup = ({ album = {}, heading = '' }) => {
			let
				albumPopupContent = $create.elem('div', '', 'popup__music'),
				albumPopupHeading = `${heading} <q>${album.title}</q>`,
				albumPopupDes = $create.elem('div', '', 'popup__music--description'),
				albumTrackList = $create.elem('details', '', 'popup__music--tracklist'),
				albumFeat = false, albumEmbed = ''

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

			if ('img' in album && 'thumb' in album.img && album.img.thumb != '') {
				let img = $create.elem('img')
				img.setAttribute('src', `${album.img.thumb}?v=${metaVars.siteVersion}`)

				albumPopupDes.appendChild(img)
			}

			albumPopupDes.appendChild($create.elem('p', `<b>Исполнител${(album.feat) ? 'и' : 'ь'}</b>: ${album.artist ? album.artist : 'Cojam'}${albumFeat ? albumFeat : ''}`))

			if ('description' in album) {
				albumPopupDes.appendChild($create.elem('p', `<b>Описание</b>: ${album.description.replace(/\n/g, '<br>')}`))
			}

			if ('release' in album) {
				albumPopupDes.appendChild($create.elem('p', `<b>Релиз</b>: ${album.release}`))
			}

			albumPopupContent.appendChild(albumPopupDes)

			if ('tracklist' in album && album.tracklist.length != 0) {
				albumTrackList.appendChild($create.elem('summary', 'Треклист'))

				album.tracklist.forEach(track => {
					albumTrackList.appendChild(parseTrack(track))
				})

				albumPopupContent.appendChild(albumTrackList)
			}

			if ('embed' in album && album.embed.type != '') {
				let
					albumEmbedSrc = 'https://',
					albumEmbedSrcID = parseFloat(album.embed.ID)

				let _color = metaVars.primeColor.replace('#', '')

				switch (album.embed.type) {
					case 'bc':
						albumEmbedSrc += `bandcamp.com/EmbeddedPlayer/album=${albumEmbedSrcID}/size=large/bgcol=ffffff/linkcol=${_color}/artwork=none/transparent=true`; break
					case 'sc':
						albumEmbedSrc += `w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${albumEmbedSrcID}&color=${_color}`; break
				}

				albumEmbed = $create.elem('iframe', '', 'popup__music--embed')
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

			let
				albumID = album.id ? album.id : album.title.toLowerCase().replace(' ', '-'),
				albumHeading = '',
				albumCoverLink = ''

			if ('img' in album && 'cover' in album.img && album.img.cover != '') {
				albumCoverLink = `${album.img.cover}?v=${metaVars.siteVersion}`

				albumCover.src = albumCoverLink
				albumCover.alt = `${albumID} cover`
			}

			switch (album.type) {
				case 'ep':
					albumHeading = 'EP'; break
				case 'game_ost':
					albumHeading = 'Саундтрек игры'; break
				default:
					albumHeading = 'Альбом'
			}

			var showPopupWF = () => showPopup({
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
			let
				gamePopupContent = $create.elem('div', '', 'popup__game'),
				gamePopupHeading = `${heading} <q>${game.title}</q>`,
				gamePopupDes = $create.elem('div', '', 'popup__game--description'),
				gamePopupLinks = $create.elem('ul', '', 'popup__game--links'),
				gamePopupPlatform = '<b>Платформа</b>: '

			gamePopupContent.appendChild($create.elem('h2', gamePopupHeading))

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
				gameContainer = $create.elem('div', '', 'games__game'),
				gameTitle = $create.elem('div', '', 'games__game--title'),
				gameRelease = $create.elem('div', '', 'games__game--release'),
				gamePoster = $create.elem('img', '', 'games__game--poster')

			let
				gameID = game.id ? game.id : game.title.toLowerCase().replace(' ', '-'),
				gameHeading = 'Игра',
				gamePosterLink = ''

			if ('img' in game && 'poster' in game.img && game.img.poster != '') {
				gamePosterLink = `${game.img.poster}?v=${metaVars.siteVersion}`

				gamePoster.src = gamePosterLink
				gamePoster.alt = `${gameID} poster`
			}

			var showPopupWF = () => showPopup({
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

		data.our.forEach(game => container.appendChild(parseGame(game)))
	}
}
