import likely from 'ilyabirman-likely'

import { INFO } from './core'
import { $make, $create, $check } from './kamina'

const createHeading = text => $create.elem('h2', text)

const createPopupLink = (link = '', text = '', isExternal = false) => {
	let linkOptions = ['html']

	if (isExternal) {
		linkOptions.push('e')
	}

	return $create.elem(
		'li',
		$create.link(
			link, text,
			'', linkOptions
		)
	)
}

const generateLikely = ({ container, options = { title: '', URL: '', heading: '', image: '' } }) => {
	if (!container.nodeName) { return }

	let likelyElem = $create.elem('div', '', 'likely')

	let likelySocs = {
		vk: $create.elem('div', 'Поделиться', 'vkontakte'),
		tg: $create.elem('div', 'Рассказать', 'telegram'),
		tw: $create.elem('div', 'Твитнуть', 'twitter'),
		fb: $create.elem('div', 'Шернуть', 'facebook')
	}

	if (options.URL) {
		likelyElem.dataset.url = `${location.origin}/${options.URL}`
	}

	if (options.title) {
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

const showPopup = ({ content, options = { heading: '', id: '', title: '', image: '' } }) => {
	if (!content.nodeName) { return }

	let popup = $create.elem('div', '', 'popup')

	let popupContainer = $create.elem('div', '', 'popup--container')

	let popupURL = `${INFO.current_page.URL.replace('/', '')}?show=${options.id}`

	history.pushState('', INFO.current_page.title, popupURL)

	let closePopup = () => {
		if (location.search != '') {
			history.pushState('', INFO.current_page.title, INFO.current_page.URL)
		}

		popup.remove()
	}

	let popupCloseBtn = $create.elem('button', '🗙', 'popup--close')

	popupCloseBtn.setAttribute('aria-label', 'Закрыть')

	popup.appendChild(popupCloseBtn)

	let popupContent = content.cloneNode(true)

	popupContent.classList.add('popup--content')

	popup.addEventListener('click', e => {
		let target = e.target

		if (
			target.classList.contains('popup') ||
			target.classList.contains('popup--close')
		) {
			closePopup()
		} else {
			return
		}
	})

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

	document.body.insertBefore(
		popup,
		$make.qs('.container')
	)
}

export const $parser = {
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

			if (track.feat) {
				trackFeat = ' (ft. '
				track.feat.forEach((person, i) => {
					trackFeat += `${person}${(i == track.feat.length - 1) ? ')' : ', '}`
				})
			}

			trackContainer.appendChild($create.elem(
				'p',
				`${trackData.artist} &ndash; ${trackData.title}${trackFeat ? trackFeat : ''}`
			))

			if (track.description) {
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

			if (album.feat) {
				albumFeat = ' при участии '
				album.feat.forEach((person, i) => {
					let personID = person.nick

					if (person.link) {
						personID = $create.link(person.link, person.nick, '', ['html', 'e'])
					}

					albumFeat += `${personID}${(i == album.feat.length - 1) ? '.' : ', '}`
				})
			}

			albumPopupContent.appendChild($create.elem('h2', albumPopupHeading))

			let albumPopupDes = $create.elem('div', '', 'popup__music--description')

			if (album.img && album.img.thumb) {
				let img = $create.elem('img')

				img.setAttribute('src', `${album.img.thumb}?v=${INFO.meta.site_version}`)

				img.addEventListener('error', e => {
					img.hidden = true
				})

				albumPopupDes.appendChild(img)
			}

			let albumArtist = album.artist
				? album.artist
				: 'Cojam'

			albumPopupDes.appendChild($create.elem(
				'p',
				`<b>Исполнител${(album.feat) ? 'и' : 'ь'}</b>: ${albumArtist}${albumFeat ? albumFeat : ''}`
			))

			if (album.description) {
				albumPopupDes.appendChild($create.elem('p', `<b>Описание</b>: ${album.description.replace(/\n/g, '<br>')}`))
			}

			if (album.release) {
				albumPopupDes.appendChild($create.elem('p', `<b>Релиз</b>: ${album.release}`))
			}

			albumPopupContent.appendChild(albumPopupDes)

			let albumTrackList = $create.elem('details', '', 'popup__music--tracklist')

			if (album.tracklist && album.tracklist.length > 0) {
				albumTrackList.appendChild($create.elem('summary', 'Треклист'))

				album.tracklist.forEach(track => {
					albumTrackList.appendChild(parseTrack({ track: track, albumArtist: albumArtist }))
				})

				albumPopupContent.appendChild(albumTrackList)
			}

			let albumEmbed = $create.elem('iframe', '', 'popup__music--embed')

			let https = 'https://'

			if (album.embed && album.embed.type) {
				let albumEmbedSrc = https

				let albumEmbedSrcID = Number(album.embed.ID)

				let color = INFO.meta.prime_color.replace('#', '')

				let _user = album.embed.user
					? album.embed.user
					: 'team@cojam.ru'

				switch (album.embed.type) {
					case 'bc':
						albumEmbedSrc += `bandcamp.com/EmbeddedPlayer/album=${albumEmbedSrcID}/size=large/bgcol=ffffff/linkcol=${color}/artwork=none/transparent=true`; break
					case 'sc':
						albumEmbedSrc += `w.soundcloud.com/player/?url=${https}api.soundcloud.com/playlists/${albumEmbedSrcID}&color=${color}`; break
					case 'ym':
						albumEmbedSrc += `music.yandex.ru/iframe/#playlist/${_user}/${albumEmbedSrcID}/hide/cover/title/`; break
				}

				albumEmbed.setAttribute('src', decodeURIComponent(albumEmbedSrc))
				albumPopupContent.appendChild(albumEmbed)
			}

			let albumEmbedLinks = $create.elem('ul', '', 'popup--links')

			if (album.links && Object.keys(album.links).length > 0) {
				if (album.links.game) {
					albumEmbedLinks.appendChild(
						createPopupLink(`${INFO.pages.games}?show=${album.links.game}`, '🕹️ Игра')
					)
				}

				if (album.links.bc) {
					albumEmbedLinks.appendChild(
						createPopupLink(`${https}${album.links.bc.user}.bandcamp.com/album/${album.links.bc.album}`, '🎵 BandCamp', true)
					)
				}

				if (album.links.sc) {
					albumEmbedLinks.appendChild(
						createPopupLink(`${https}soundcloud.com/${album.links.sc}`, '☁️ SoundCloud', true)
					)
				}

				if (album.links.vk) {
					albumEmbedLinks.appendChild(
						createPopupLink(`${https}vk.com/${album.links.vk.com}?z=audio_playlist${album.links.vk.ID}`, '🎼 ВКонтакте', true)
					)
				}

				if (album.links.yt) {
					albumEmbedLinks.appendChild(
						createPopupLink(`${https}www.youtube.com/playlist?list=${album.links.yt}`, '📼 YouTube', true)
					)
				}

				albumPopupContent.appendChild(albumEmbedLinks)
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

			if (album.img && album.img.cover) {
				albumCoverLink = `${album.img.cover}?v=${INFO.meta.site_version}`

				albumCover.src = albumCoverLink
				albumCover.alt = `${albumID} cover`

				albumCover.addEventListener('error', e => {
					e.target.hidden = true
				})
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
				case 'gba':
					gamePopupPlatform += 'Game Boy Advance'; break
				default:
					gamePopupPlatform = false
			}

			let gamePopupDes = $create.elem('div', '', 'popup__game--description')

			if (game.contest && game.contest.name) {
				let contest = (game.contest.link && game.contest.link != '')
					? $create.link(game.contest.link, game.contest.name, '', ['e', 'html'])
					: game.contest.name

				gamePopupDes.appendChild($create.elem('p', `Игра сделана для конкурса <q>${contest}</q>.`))
			}

			if (game.description) {
				gamePopupDes.appendChild($create.elem('p', `<b>Описание</b>: ${game.description}`))
			}

			if (gamePopupPlatform) {
				gamePopupDes.appendChild($create.elem('p', gamePopupPlatform))
			}

			gamePopupContent.appendChild(gamePopupDes)

			if (game.description_popup) {
				let desPopup = $create.elem('details', '', 'popup__game--description-popup')
				desPopup.appendChild($create.elem('summary', 'Подробное описание'))
				desPopup.appendChild($create.elem('p', game.description_popup.replace(/\n/g, '<br>')))
				gamePopupContent.appendChild(desPopup)
			}

			let gamePopupLinks = $create.elem('ul', '', 'popup--links')

			if (game.links && Object.keys(game.links).length > 0) {
				if (game.links.site) {
					gamePopupLinks.appendChild(
						createPopupLink(game.links.site, '🏠 Сайт игры', true)
					)
				}

				if (game.links.trailer) {
					gamePopupLinks.appendChild(
						createPopupLink(game.links.trailer, '📼 Смотреть трейлер', true)
					)
				}

				if (game.links.itch) {
					gamePopupLinks.appendChild(
						createPopupLink(game.links.itch, '🕹️ Itch.io', true)
					)
				}

				if (game.links.dl) {
					gamePopupLinks.appendChild(
						createPopupLink(game.links.dl, '☁️ Скачать', true)
					)
				}

				if (game.links.soundtrack) {
					gamePopupLinks.appendChild(
						createPopupLink(`${INFO.pages.music}?show=${game.links.soundtrack}`, '🎵 Саундтрек')
					)
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

			if (game.img && game.img.poster) {
				gamePosterLink = `${game.img.poster}?v=${INFO.meta.site_version}`

				gamePoster.src = gamePosterLink
				gamePoster.alt = `${gameID} poster`

				gamePoster.addEventListener('error', e => {
					e.target.hidden = true
				})
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

			if (game.title) {
				gameTitle.textContent = game.title
				gameContainer.appendChild(gameTitle)
			}

			if (game.release) {
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
