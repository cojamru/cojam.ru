import { $make } from './kamina';
import { $parser } from './parsers';
import { musicDB } from './db/music';

document.addEventListener('DOMContentLoaded', () =>
	$parser.music({ data: musicDB, container: $make.qs('.music') }),
);
