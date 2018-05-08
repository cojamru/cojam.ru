'use strict'

var createHeading = text => $create.elem('h2', text)

var generateLikely = ({ container, options = { title = '', URL = '', heading = '', image: '' } }) => {
	if (!options || !container.nodeName) { return }

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
			_image =    options.image ? `${location.origin}${options.image}` : ''

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

var showMore = ({ content, options = { heading = '', id = '', title = '', image = '' } }) => {
	if (!content.nodeName) { return }

	let
		body = document.body,
		dialog = $create.elem('dialog', '', 'more'),
		dialogContainer = $create.elem('div', '', 'more--container'),
		dialogContent = content.cloneNode(true),
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
	dialogContainer.appendChild(dialogContent)

	generateLikely({
		container: dialogContainer,
		options: {
			title: options.title,
			URL: dialogURL,
			heading: options.heading,
			image: options.image
		}
	})

	dialog.appendChild(dialogCloseBtn)
	dialog.appendChild(dialogContainer)
	body.appendChild(dialog)
}

var $parser = {
	music: ({ data = {}, container }) => {
		container.textContent = ''

		let parseTrack = (track = {}) => {
			if (!track) { return }

			let
				trackContainer = $create.elem('div', '', 'more__music--track'),
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
				trackContainer.appendChild($create.elem('p', `${track.description.replace(/\n/g, '<br>')}`, 'more__music--track-info'))
			}

			return trackContainer
		}

		let generateMore = ({ album = {}, heading = '' }) => {
			let
				albumMoreContent = $create.elem('div', '', 'more__music'),
				albumMoreHeading = `${heading} <q>${album.title}</q>`,
				albumMoreDes = $create.elem('div', '', 'more__music--description'),
				albumFeat = false, albumTrackList = '', albumEmbed = ''

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

			albumMoreContent.appendChild($create.elem('h2', albumMoreHeading))

			if ('img' in album && 'thumb' in album.img && album.img.thumb != '') {
				let img = $create.elem('img')
				img.setAttribute('src', `${album.img.thumb}?v=${siteVersion}`)
				albumMoreDes.appendChild(img)
			}

			albumMoreDes.appendChild($create.elem('p', `<b>Исполнител${(album.feat) ? 'и' : 'ь'}</b>: ${album.artist ? album.artist : 'Cojam'}${albumFeat ? albumFeat : ''}`))

			if ('description' in album) {
				albumMoreDes.appendChild($create.elem('p', `<b>Описание</b>: ${album.description.replace(/\n/g, '<br>')}`))
			}

			if ('release' in album) {
				albumMoreDes.appendChild($create.elem('p', `<b>Релиз</b>: ${album.release}`))
			}

			albumMoreContent.appendChild(albumMoreDes)

			if ('tracklist' in album && album.tracklist.length != 0) {
				albumTrackList = $create.elem('details', '', 'more__music--tracklist')
				albumTrackList.appendChild($create.elem('summary', 'Треклист'))

				album.tracklist.forEach(track => {
					albumTrackList.appendChild(parseTrack(track))
				})

				albumMoreContent.appendChild(albumTrackList)
			}

			if ('embed' in album && album.embed.type != '') {
				let
					albumEmbedSrc = 'https://',
					albumEmbedSrcID = parseFloat(album.embed.ID)

				switch (album.embed.type) {
					case 'bc':
						albumEmbedSrc += `bandcamp.com/EmbeddedPlayer/album=${albumEmbedSrcID}/size=large/bgcol=ffffff/linkcol=8400a5/artwork=none/transparent=true`; break
					case 'sc':
						albumEmbedSrc += `w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/${albumEmbedSrcID}&color=8400a5`; break
				}

				albumEmbed = $create.elem('iframe', '', 'more__music--embed')
				albumEmbed.setAttribute('src', albumEmbedSrc)
				albumMoreContent.appendChild(albumEmbed)
			}

			return albumMoreContent
		}

		let parseAlbum = (album = {}) => {
			if (!album) { return }

			let
				albumContainer =   $create.elem('div', '', 'music__album'),
				albumAbout =       $create.elem('div', '', 'music__album--about'),
				albumBackground =  $create.elem('div', '', 'music__album--background')

			let
				albumID = album.id ? album.id : album.title.toLowerCase().replace(' ', '-'),
				albumHeading = '',
				albumCover = ''

			if ('img' in album && 'cover' in album.img && album.img.cover != '') {
				albumCover = `${album.img.cover}?v=${siteVersion}`
				albumBackground.style.backgroundImage = `url('${albumCover}')`
			}

			switch (album.type) {
				case 'ep':
					albumHeading = 'EP'; break
				case 'game_ost':
					albumHeading = 'Саундтрек игры'; break
				default:
					albumHeading = 'Альбом'
			}

			var showMoreWF = () => showMore({
				content: generateMore({ album: album, heading: albumHeading }),
				options: {
					heading: albumHeading,
					id: albumID,
					title: album.title,
					image: albumCover
				}
			})

			albumContainer.onclick = () => showMoreWF()
			if ($check.get('show') == albumID) { showMoreWF() }

			albumAbout.appendChild($create.elem('h3', album.title))
			albumAbout.appendChild($create.elem('p', `Треков в альбоме: ${album.tracklist.length}`))

			albumContainer.appendChild(albumBackground)
			albumContainer.appendChild(albumAbout)

			return albumContainer
		}

		data.albums.forEach(album => container.appendChild(parseAlbum(album)))
	},

	games: ({ data = {}, container }) => {
		container.textContent = ''

		let generateMore = ({ game = {}, heading = '' }) => {
			let
				gameMoreContent = $create.elem('div', '', 'more__game'),
				gameMoreHeading = `${heading} <q>${game.title}</q>`,
				gameMoreDes = $create.elem('div', '', 'more__game--description'),
				gameMoreLinks = $create.elem('ul', '', 'more__game--links'),
				gameMorePlatform = '<b>Платформа</b>: '

			gameMoreContent.appendChild($create.elem('h2', gameMoreHeading))

			switch (game.platform) {
				case 'flash':
					gameMorePlatform += 'Flash'; break
				case 'pc':
					gameMorePlatform += 'PC'; break
				case 'online':
					gameMorePlatform += 'браузерная игра'; break
				default:
					gameMorePlatform = false
			}

			if ('contest' in game && 'name' in game.contest && game.contest.name != '') {
				let contest = (game.contest.link && game.contest.link != '')
					? $create.link(game.contest.link, game.contest.name, '', ['e', 'html'])
					: game.contest.name

				gameMoreDes.appendChild($create.elem('p', `Игра сделана для конкурса <q>${contest}</q>.`))
			}

			if ('description' in game) {
				gameMoreDes.appendChild($create.elem('p', `<b>Описание</b>: ${game.description}`))
			}

			if (gameMorePlatform) {
				gameMoreDes.appendChild($create.elem('p', gameMorePlatform))
			}

			gameMoreContent.appendChild(gameMoreDes)

			if ('description_more' in game && game.description_more != '') {
				let desMore = $create.elem('details', '', 'more__game--description-more')
				desMore.appendChild($create.elem('summary', 'Подробное описание'))
				desMore.appendChild($create.elem('p', game.description_more.replace(/\n/g, '<br>')))
				gameMoreContent.appendChild(desMore)
			}

			if ('links' in game && Object.keys(game.links).length != 0) {
				if (game.links.play && game.links.play != '') {
					gameMoreLinks.appendChild($create.elem('li', $create.link(game.links.play, '🕹️ Играть онлайн', '', ['html'])))
				}

				if (game.links.dl && game.links.dl != '') {
					gameMoreLinks.appendChild($create.elem('li', $create.link(game.links.dl, '☁️ Скачать', '', ['e', 'html'])))
				}

				if (game.links.site && game.links.site != '') {
					gameMoreLinks.appendChild($create.elem('li', $create.link(game.links.site, '🏠 Сайт игры', '', ['html'])))
				}

				gameMoreContent.appendChild(gameMoreLinks)
			}

			return gameMoreContent
		}

		let parseGame = (game = {}) => {
			let
				gameContainer = $create.elem('div', '', 'games__game'),
				gameTitle = $create.elem('div', '', 'games__game--title'),
				gameRelease = $create.elem('div', '', 'games__game--release'),
				gamePoster = $create.elem('div', '', 'games__game--poster')

			let
				gameID = game.id ? game.id : game.title.toLowerCase().replace(' ', '-'),
				gameHeading = 'Игра',
				gameImage = ''

			if ('img' in game && 'poster' in game.img && game.img.poster != '') {
				gameImage = `${game.img.poster}?v=${siteVersion}`
				gamePoster.style.backgroundImage = `url('${gameImage}')`
			}

			var showMoreWF = () => showMore({
				content: generateMore({ game: game, heading: gameHeading }),
				options: {
					heading: gameHeading,
					id: gameID,
					title: game.title,
					image: gameImage
				}
			})

			gameContainer.onclick = () => showMoreWF()
			if ($check.get('show') == gameID) { showMoreWF() }

			gameContainer.appendChild(gamePoster)

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
