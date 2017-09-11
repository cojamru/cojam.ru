'use strict'

var musicDB = {
	albums: [
		{
			title: 'Quantum Suicide',
			artist: 'Cojam',
			feat: [ { nick: 'SHUMANGA', link: 'https://vk.com/public119295761' }, { nick: 'MrModez', link: 'https://soundcloud.com/mrmodez'} ],
			description: '',
			release: '9 сентября 2017',
			cover: { big: '/assets/img/music/quantum-suicide-cover.jpg', small: '' },
			tracklist: [
				{ title: 'Injoo' },
				{ title: 'Lakaii' },
				{ title: 'Goodbye Sweet Life' },
				{ title: 'Coal in My Sock' },
				{ title: 'The Last Shot', feat: ['MrModez'] },
				{ title: 'Loading Screen' },
				{ title: 'SkyCrusher', feat: ['SHUMANGA'] },
				{ title: 'Eat a Croissant' },
				{ title: 'Apparatus Technology' },
				{ title: 'Super Space' },
				{ title: 'The Confrontation' },
				{ title: 'White' },
				{ title: 'Red Leaves' },
				{ title: 'Death is Just a Beginning' },
				{ title: 'Lessi Crip' },
				{ title: 'Iotusatu' },
				{ title: 'Outro' }
			],
			links: {
				embed: 'https://bandcamp.com/EmbeddedPlayer/album=1341339705/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true',
				bc: 'https://cojam.bandcamp.com/album/quantum-suicide'
			}
		},
		{
			title: 'Despair Horizons',
			artist: 'Cojam',
			feat: [ { nick: 'SHUMANGA', link: 'https://vk.com/public119295761' } ],
			description: 'Всю её жизнь окутал туман. Дни расплывались в памяти, а окружающая действительность потеряла для неё какой-либо интерес. Она тонула в печали, стала для всех вокруг словно колючей сосной. Лишь тёмные непроглядные леса могли принять потерянную душу.',
			release: '29 июля 2017',
			cover: { big: '/assets/img/music/despair-horizons-cover.jpg', small: '' },
			tracklist: [
				{ title: 'Kris\'s Dysphoria' },
				{ title: 'Ashley Theme', artist: 'SHUMANGA' },
				{ title: 'The Library' },
				{ title: 'Datura', artist: 'SHUMANGA' },
				{ title: 'Together' },
				{ title: '"I Will Find Her"', artist: 'SHUMANGA' },
				{ title: 'Good Ending', artist: 'SHUMANGA' }
			],
			links: {
				embed: 'https://bandcamp.com/EmbeddedPlayer/album=3977908732/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true',
				bc: 'https://cojam.bandcamp.com/album/despair-horizons'
			}
		},
		{
			title: 'グレイブブラッドの魔女',
			id: 'tower',
			artist: 'Cojam',
			feat: [ { nick: 'Marisahates', link: 'https://vk.com/id44907782' } ],
			description: 'Туманы Грейвблуда не отпустят никого, вступившего во тьму леса. Никто не может избежать судьбы, никто не может бежать от здешних созданий. Подумай дважды, если решишься оказаться здесь.',
			release: '8 марта 2017',
			cover: { big: '/assets/img/music/witch-cover.png', small: '' },
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
			links: {
				embed: 'https://bandcamp.com/EmbeddedPlayer/album=3209699199/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true',
				bc: 'https://cojam.bandcamp.com/album/--2'
			}
		},
		{
			title: 'The Nightmare Begins',
			id: 'nightmare-begins',
			artist: 'Cojam',
			type: 'ep',
			description: 'Иногда те игры, с которыми связано твоё детство, могут скрывать в себе великое несчастье. Ты не мог ожидать больших проблем от этого маленького клоуна, но вот ты уже стоишь над трупом твоего дедушки. Или что насчёт этого фиолетового дракона, что был твоим фаворитом всё детство? Просто взгляни под другим углом - десятилетиями он приносил боль тысячам существ, не важно, злым или добрым, и всё сходило ему с рук. Эти игры сотканы из катастрофы. Ты ничего не заметил, но они уже посеяли зерно бесконечной боли в твоё сердце. Ничто не спасёт тебя. Кошмар начинается.',
			release: '10 февраля 2015',
			cover: { big: '/assets/img/music/nightmare-cover.jpg', small: '/assets/img/music/nightmare-cover-thumb.jpg' },
			tracklist: [
				{ title: 'Sorceress\' Lair' },
				{ title: 'The Joka Syndrome' },
				{ title: 'The Alpha Syndrome' },
				{ title: 'The Nether Syndrome' },
				{ title: 'The Bad Dragon Syndrome' },
				{ title: 'Enchanted by Darkness' },
				{ title: 'A Dream Diary' }
			],
			links: {
				embed: 'https://bandcamp.com/EmbeddedPlayer/album=2893231190/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true',
				bc: 'https://cojam.bandcamp.com/album/the-nightmare-begins',
				sc: 'midipidemy/sets/the-nightmare-begins'
			}
		},
		{
			title: 'Jicem',
			artist: 'Cojam',
			type: 'game_ost',
			feat: [ { nick: 'MrModez', link: 'https://soundcloud.com/mrmodez' } ],
			release: '21 декабря 2016',
			cover: { big: '/assets/img/music/jicem-cover.png', small: '/assets/img/music/jicem-cover-thumb.png' },
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
			links: {
				embed: 'https://bandcamp.com/EmbeddedPlayer/album=945480585/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true',
				bc: 'https://cojam.bandcamp.com/album/jicem-official-soundtrack'
			}
		},
		{
			title: 'Jicem: Ниже Нуля',
			id: 'jicem-ltz',
			artist: 'Cojam',
			type: 'game_ost',
			cover: { big: '/assets/img/music/jicem-ltz-cover.jpg' },
			tracklist: [
				{ title: 'Graviball Launcher' },
				{ title: 'Our Regular Mission' },
				{ title: 'Tazerjump' },
				{ title: 'Alone Escapists' }
			],
			links: {
				embed: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/189111485',
				sc: 'midipidemy/sets/jicem'
			}
		},
		{
			title: 'Липкие Сладкие Лифчики',
			id: 'titty',
			artist: 'Cojam',
			type: 'game_ost',
			cover: { big: '/assets/img/music/titty-cover.jpg' },
			tracklist: [
				{ title: 'Одна сауна на двоих и ещё с полсотни левитирующих мозгов' },
				{ title: 'Беспорядок в магазине нижнего белья' }
			],
			links: {
				embed: 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/136449277',
				sc: 'midipidemy/sets/qk3tr4pp10xo'
			}
		},
		{
			title: 'Anastasia',
			artist: 'Cojam',
			type: 'ep',
			release: '2 января 2015',
			cover: { big: '/assets/img/music/anastasia-cover.png', small: '/assets/img/music/anastasia-cover-thumb.png' },
			tracklist: [
				{ title: 'Konjak' },
				{ title: 'Anastasia' },
				{ title: 'Universe Corrupted' },
				{ title: 'D A R K S K Y' },
				{ title: 'Сны на двоих' }
			],
			links: {
				embed: 'https://bandcamp.com/EmbeddedPlayer/album=3884057808/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true',
				bc: 'https://cojam.bandcamp.com/album/anastasia',
				sc: 'midipidemy/sets/anastasia'
			}
		}
	],
	singles: []
}
