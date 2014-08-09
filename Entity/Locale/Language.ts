
import LanguageEnum = require('./LanguageEnum');

export = Language;
class Language {

	get Enum() { return this.language; }

	constructor(
		private language: LanguageEnum
	) {}
}
