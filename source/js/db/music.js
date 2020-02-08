'use strict'

let musicDB = {
	albums: [
		{
			title: 'Witchcvlt',
			id: 'witchcvlt',
			artist: 'Cojam',
			description: 'Играйте за Вику в этой новой увлекательной игре для домашней консоли PlayStation. Найдите новых друзей в Грейвблуде, вместе решайте головоломки и сражайтесь со злом! Выбирайте из множества заклинаний чёрной магии, видов оружия и методов борьбы. Найдите стратегию и истребите зло. Судьба Грейвблуда в ваших руках! Поддерживается контроллер DualShock. Требуется карта памяти (один блок). Инструкция в комплекте.',
			release: '20 июня 2019',
			img: {
				cover: `${INFO.CDN_paths.music.covers}/witchcvlt-cover.png`,
				thumb: `${INFO.CDN_paths.music.covers}/witchcvlt-cover-thumb.png`
			},
			tracklist: [
				{ title: 'Meet Me at the Fairy Ring' },
				{ title: 'He\'s Gorefield' },
				{ title: 'Your Cheatin\' Magic' },
				{ title: 'Total Eclipse' },
				{ title: 'The Ghost Girl of the Dark Luna Park' },
				{ title: 'Milky Swimming' },
				{ title: 'I Witnessed UFO Crash' },
				{ title: 'Ghostly Ringing Bells' },
				{ title: 'Late Night Screaming' }
			],
			embed: {
				type: 'bc',
				ID: 2416956577
			},
			links: {
				bc: {
					user: 'cojam',
					album: 'witchcvlt'
				},
				vk: {
					com: 'tehcojam',
					ID: '-71897180_77613811'
				}
			}
		},

		{
			title: '抑うつ',
			id: 'depression',
			artist: 'cojam',
			description: 'i am sad\nthis sadness never ends',
			release: '26 октября 2018',
			img: {
				cover: `${INFO.CDN_paths.music.covers}/depression-cover.jpg`,
				thumb: `${INFO.CDN_paths.music.covers}/depression-cover-thumb.jpg`
			},
			tracklist: [
				{ title: 'bury me lavender' },
				{ title: 'so i kissed her secretly' },
				{ title: 'i want to die' },
				{ title: 'exrthstxr' },
				{ title: 'far light' },
				{ title: 'snotgirl' },
				{ title: 'spaceship isolation' },
				{ title: 'outer space' },
				{ title: 'drowning' },
				{ title: 'wet chokers' }
			],
			embed: {
				type: 'bc',
				ID: 46584512
			},
			links: {
				bc: {
					user: 'cojam',
					album: '--3'
				},
				vk: {
					com: 'tehcojam',
					ID: '-71897180_77613808'
				}
			}
		},

		{
			title: 'グレイブブラッドの魔女 Sakura',
			id: 'sakura',
			artist: 'Cojam',
			feat: [ { nick: 'Marisahates', link: 'https://vk.com/id44907782' } ],
			description: 'Ремейк альбома «グレイブブラッドの魔女» (2017).',
			release: '20 февраля 2018',
			img: {
				cover: `${INFO.CDN_paths.music.covers}/sakura-cover.jpg`,
				thumb: `${INFO.CDN_paths.music.covers}/sakura-cover-thumb.jpg`
			},
			tracklist: [
				{ title: 'Anxiety' },
				{ title: 'Panties' },
				{ title: 'Touching The Star' },
				{ title: 'Sakura Falls' },
				{ title: 'Save Vika' },
				{ title: 'Fell In Love With A Vampire Girl' },
				{ title: '朝のミルクシェイク' },
				{ title: 'Never', feat: ['Marisahates'] },
				{ title: 'Night Guests' },
				{ title: 'Shadows Of Pines' },
				{ title: 'S K Y F A L L' },
				{ title: 'Graveblood River' }
			],
			embed: {
				type: 'bc',
				ID: 1359904006
			},
			links: {
				bc: {
					user: 'cojam',
					album: 'sakura'
				},
				vk: {
					com: 'tehcojam',
					ID: '-71897180_77613807'
				},
				yt: 'PLmIjlK8YYsHsluAtPeL0q0M3vSse7e3hS'
			}
		},

		{
			title: 'Quantum Suicide',
			artist: 'Cojam',
			feat: [ { nick: 'SHUMANGA', link: 'https://vk.com/public119295761' }, { nick: 'MrModez', link: 'https://soundcloud.com/mrmodez'} ],
			description: 'После событий «Despair Horizons» Крис обнаруживает себя мёртвой. Это конец истории? Или её смерть – начало чего-то большего?\n«Quantum Suicide» – это целый час кибер-мусора, вобравший в себя треки из разных компиляций, незавершённые синглы и прочий стафф, а часть музыки в этом альбоме записана в параллельных мирах. Этот альбом есть отражение мультивселенной – у треков здесь нет жанра или общей темы, и здесь вы услышите всё её разнообразие.',
			release: '9 сентября 2017',
			img: {
				cover: `${INFO.CDN_paths.music.covers}/quantum-suicide-cover.jpg`,
				thumb: `${INFO.CDN_paths.music.covers}/quantum-suicide-cover-thumb.jpg`
			},
			tracklist: [
				{
					title: 'Injoo',
					description: 'Из сборника Nintendocore Lives «Glitched» (2017).'
				},
				{
					title: 'Lakaii',
					description: 'Из сборника DeadDolphins & Cojam «Split it out!» (2017).'
				},
				{ title: 'Goodbye Sweet Life' },
				{
					title: 'Coal in My Sock',
					description: 'Из сборника A Grindcore Christmas «Volume 4» (2014).'
				},
				{
					title: 'The Last Shot',
					feat: ['MrModez'],
					description: 'Из сборника «Cojam Secret CD» (2014).'
				},
				{ title: 'Loading Screen' },
				{ title: 'SkyCrusher', feat: ['SHUMANGA'] },
				{ title: 'Eat a Croissant' },
				{
					title: 'Apparatus Technology',
					description: 'Кавер на тему игры «Apparatus Technology».'
				},
				{ title: 'Super Space' },
				{
					title: 'The Confrontation',
					description: 'Первоапрельский трек для фанатского сообщества по игре «The Sims 2» в VK.'
				},
				{ title: 'White' },
				{
					title: 'Red Leaves',
					description: 'Потерянный трек из «グレイブブラッドの魔女» (2017).'
				},
				{ title: 'Death is Just a Beginning' },
				{
					title: 'Lessi Crip',
					description: 'Трек из игры «Lessy Creep» (2015).'
				},
				{ title: 'Iotusatu' },
				{ title: 'Outro' }
			],
			embed: {
				type: 'bc',
				ID: 1341339705
			},
			links: {
				bc: {
					user: 'cojam',
					album: 'quantum-suicide'
				},
				vk: {
					com: 'tehcojam',
					ID: '-71897180_77613805'
				}
			}
		},

		{
			title: 'Despair Horizons',
			artist: 'Cojam',
			feat: [ { nick: 'SHUMANGA', link: 'https://vk.com/public119295761' } ],
			description: 'Всю её жизнь окутал туман. Дни расплывались в памяти, а окружающая действительность потеряла для неё какой-либо интерес. Она тонула в печали, стала для всех вокруг словно колючей сосной. Лишь тёмные непроглядные леса могли принять потерянную душу.',
			release: '29 июля 2017',
			img: {
				cover: `${INFO.CDN_paths.music.covers}/despair-horizons-cover.jpg`,
				thumb: `${INFO.CDN_paths.music.covers}/despair-horizons-cover-thumb.jpg`
			},
			tracklist: [
				{
					title: 'Kris\'s Dysphoria',
					description: 'Всё в жизни Крис шло наперекосяк. Она стала аутсайдером в школе и моменты, когда одноклассники не замечали её вовсе, были для ней лучом света. Это плачевно сказывалось на учёбе, что, в свою очередь, вылилось в скандалы в родительском доме. Последнее место, где её душа находит спокойствие - это тёмный лес и маленькая заброшенная библиотека в его глуби.'
				},
				{
					title: 'Ashley Theme',
					artist: 'SHUMANGA',
					description: 'Прогуливаясь по лесу, Эшли искала в карманах джинсовки последнюю сигарету. Очередной прогул, очередной срыв на одноклассников. Она закурила. Голова гудела так, что даже сигаретный дым не мог помочь отвлечься от тяжелых мыслей. Задумчиво глядя под ноги, она не заметила, как перед ней появилось заброшенное здание. Безо всякого интереса, она открыла дверь. В большой комнате сидела Она.'
				},
				{
					title: 'The Library',
					description: 'Что скрывали страницы старых книг, собирающих пыль на полках этой библиотеки? То, что больше никогда не даст ей спокойно уснуть. Перед Крис открылся целый новый мир - изнанка реальности, сперва проявляющаяся в образе теней, поджидающих её у дома. Шумы и ощущение чьего-то присутствия стали поджидать Кристину на каждом углу. Об этой находке Крис спешила поделиться со своей новой подругой.'
				},
				{
					title: 'Datura',
					artist: 'SHUMANGA',
					description: 'Увлеченная рассказами Крис, Эшли решила расслабиться. Конечно, ей слабо верилось в рассказы подруги. Она взяла свой порошок, рассыпала на столе...\nСпустя несколько минут она провалилась сквозь землю. Вокруг все сильнее проявлялось нечто сверхъестественное... тени, тусклое мерцание света, звуки, коих она никогда не слышала... Эшли поняла: «Все, что рассказывала Крис - сбывается, или же я схожу с ума...»'
				},
				{
					title: 'Together',
					description: 'Плохая успеваемость в школе в конце концов привела к жёсткому контролю со стороны родителей. Единственным способом видеться со своей подругой стала чёрная магия. Но прежде чем бросаться во все тяжкие, Крис стоило задуматься о последствиях выхода в потусторонний мир и о проклятии заброшенной библиотеки.'
				},
				{
					title: '"I Will Find Her"',
					artist: 'SHUMANGA',
					description: '«Да кто они такие, чтобы отнимать её у меня? Почему все так сложно? День без веществ для меня ничто, по сравнению с днем без неё. Я обязательно найду и верну её... Крис, ты все сможешь, мы встретимся Там, несмотря ни на что.»'
				},
				{
					title: 'Good Ending',
					artist: 'SHUMANGA',
					description: 'Рука об руку. Вопреки всем преградам. Она идет и улыбается Ей. Все ещё печальные, потерянные и сломленные, они шли вдоль тропинки к месту, где впервые встретились. Не зная, что будет завтра, девушки были счастливы здесь и сейчас.'
				}
			],
			embed: {
				type: 'bc',
				ID: 3977908732
			},
			links: {
				bc: {
					user: 'cojam',
					album: 'despair-horizons'
				},
				vk: {
					com: 'tehcojam',
					ID: '-71897180_77613804'
				}
			}
		},

		{
			title: 'グレイブブラッドの魔女',
			id: 'tower',
			artist: 'Cojam',
			feat: [ { nick: 'Marisahates', link: 'https://vk.com/id44907782' } ],
			description: 'Туманы Грейвблуда не отпустят никого, вступившего во тьму леса. Никто не может избежать судьбы, никто не может бежать от здешних созданий. Подумай дважды, если решишься оказаться здесь.',
			release: '8 марта 2017',
			img: {
				cover: `${INFO.CDN_paths.music.covers}/tower-cover.jpg`,
				thumb: `${INFO.CDN_paths.music.covers}/tower-cover-thumb.jpg`
			},
			tracklist: [
				{ title: 'Anxiety' },
				{ title: 'Panties' },
				{ title: 'Never', feat: ['Marisahates'] },
				{ title: 'Fell In Love With A Vampire Girl' },
				{ title: 'Save Vika' },
				{ title: 'Graveblood River' },
				{ title: 'Shadows Of Pines' },
				{ title: 'Night Guests' },
				{ title: 'The Nightmare' },
				{ title: 'Touching The Star' }
			],
			embed: {
				type: 'bc',
				ID: 3209699199
			},
			links: {
				bc: {
					user: 'cojam',
					album: '--2'
				},
				vk: {
					com: 'tehcojam',
					ID: '-71897180_77613803'
				}
			}
		},

		{
			title: 'The Nightmare Begins',
			id: 'nightmare-begins',
			artist: 'Cojam',
			type: 'ep',
			description: 'Иногда те игры, с которыми связано твоё детство, могут скрывать в себе великое несчастье. Ты не мог ожидать больших проблем от этого маленького клоуна, но вот ты уже стоишь над трупом твоего дедушки. Или что насчёт этого фиолетового дракона, что был твоим фаворитом всё детство? Просто взгляни под другим углом - десятилетиями он приносил боль тысячам существ, не важно, злым или добрым, и всё сходило ему с рук. Эти игры сотканы из катастрофы. Ты ничего не заметил, но они уже посеяли зерно бесконечной боли в твоё сердце. Ничто не спасёт тебя. Кошмар начинается.',
			release: '10 февраля 2017',
			img: {
				cover: `${INFO.CDN_paths.music.covers}/nightmare-cover.jpg`,
				thumb: `${INFO.CDN_paths.music.covers}/nightmare-cover-thumb.jpg`
			},
			tracklist: [
				{ title: 'Sorceress\' Lair' },
				{ title: 'The Joka Syndrome' },
				{ title: 'The Alpha Syndrome' },
				{ title: 'The Nether Syndrome' },
				{ title: 'The Bad Dragon Syndrome' },
				{ title: 'Enchanted by Darkness' },
				{ title: 'A Dream Diary' }
			],
			embed: {
				type: 'bc',
				ID: 2893231190
			},
			links: {
				bc: {
					user: 'cojam',
					album: 'the-nightmare-begins'
				},
				sc: 'midipidemy/sets/the-nightmare-begins',
				yt: 'PLmIjlK8YYsHuAJD0uOg0-dCp4HtoxKLxc'
			}
		},

		{
			title: 'Jicem',
			artist: 'Cojam',
			type: 'game_ost',
			feat: [ { nick: 'MrModez', link: 'https://soundcloud.com/mrmodez' } ],
			release: '21 декабря 2016',
			img: {
				cover: `${INFO.CDN_paths.music.covers}/jicem-cover.png`,
				thumb: `${INFO.CDN_paths.music.covers}/jicem-cover-thumb.png`
			},
			tracklist: [
				{ title: 'Battle at Biograd' },
				{ title: 'Violet Night' },
				{ title: 'Jicebreak', artist: 'MrModez' },
				{ title: 'Negatively Charged Rifle' },
				{ title: 'Village Morning' },
				{ title: 'Agency' },
				{ title: 'Darkwood Castle' },
				{ title: 'Water Axe' },
				{ title: 'Welcome To The Castle Of Time' },
				{ title: 'Springs Castle' },
				{ title: 'Neverlands Castle' },
				{ title: 'Storm' },
				{ title: 'Awakening' },
				{ title: 'A Cold Forest' },
				{ title: 'Underwater Subway' },
				{ title: 'Iotusatu Digital Road' },
				{ title: 'Juicy Win' },
				{ title: 'Graveblood Tower' }
			],
			embed: {
				type: 'bc',
				ID: 945480585
			},
			links: {
				bc: {
					user: 'cojam',
					album: 'jicem-official-soundtrack'
				},
				game: 'jicem-dm'
			}
		},

		{
			title: 'Jicem: Ниже Нуля',
			id: 'jicem-zero',
			artist: 'Cojam',
			type: 'game_ost',
			img: {
				cover: `${INFO.CDN_paths.music.covers}/jicem-zero-cover.jpg`,
				thumb: `${INFO.CDN_paths.music.covers}/jicem-zero-cover-thumb.jpg`
			},
			tracklist: [
				{ title: 'Graviball Launcher' },
				{ title: 'Our Regular Mission' },
				{ title: 'Tazerjump' },
				{ title: 'Alone Escapists' }
			],
			embed: {
				type: 'sc',
				ID: 189111485
			},
			links: {
				sc: 'midipidemy/sets/jicem',
				game: 'jicem-zero'
			}
		},

		{
			title: 'Липкие Сладкие Лифчики',
			id: 'titty',
			artist: 'Cojam',
			type: 'game_ost',
			img: {
				cover: `${INFO.CDN_paths.music.covers}/titty-cover.jpg`,
				thumb: `${INFO.CDN_paths.music.covers}/titty-cover-thumb.jpg`
			},
			tracklist: [
				{ title: 'Беспорядок в магазине нижнего белья' },
				{ title: 'Склизские скользкие монстры в твоём доме' },
				{ title: 'Одна сауна на двоих и ещё с полсотни левитирующих мозгов' },
				{ title: 'Громкое противостояние с вытекающим разрушением половины города' },
				{ title: 'Горячая развязка истории' }
			],
			embed: {
				type: 'sc',
				ID: 136449277
			},
			links: {
				sc: 'midipidemy/sets/qk3tr4pp10xo',
				game: 'titty'
			}
		},

		{
			title: 'Anastasia',
			artist: 'Cojam',
			type: 'ep',
			release: '2 января 2015',
			img: {
				cover: `${INFO.CDN_paths.music.covers}/anastasia-cover.png`,
				thumb: `${INFO.CDN_paths.music.covers}/anastasia-cover-thumb.png`
			},
			tracklist: [
				{ title: 'Konjak' },
				{ title: 'Anastasia' },
				{ title: 'Universe Corrupted' },
				{ title: 'D A R K S K Y' },
				{ title: 'Сны на двоих' }
			],
			embed: {
				type: 'bc',
				ID: 3884057808
			},
			links: {
				bc: {
					user: 'cojam',
					album: 'anastasia'
				},
				sc: 'midipidemy/sets/anastasia',
				vk: {
					com: 'tehcojam',
					ID: '-71897180_66803284'
				}
			}
		}
	],

	singles: []
}
