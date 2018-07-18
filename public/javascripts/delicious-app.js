import '../sass/style.scss';

import { $, $$ } from './modules/bling';
import autocomplete from './modules/autocomplete';

// Takes Lat, then Lng 'the right way'
autocomplete($('#address'), $('#lat'), $('#lng'));
