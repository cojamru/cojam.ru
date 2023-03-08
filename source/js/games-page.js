import { $make } from './kamina';
import { $parser } from './parsers';
import { gamesDB } from './db/games';

document.addEventListener('DOMContentLoaded', () =>
	$parser.games({ data: gamesDB, container: $make.qs('.games') }),
);
