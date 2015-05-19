
import LanguageEnum = require('./LanguageEnum');

export = Language;
class Language {

	get Enum() { return this.language; }
	get EnumValue() { return LanguageEnum[this.language]; }

	constructor(
		private language: LanguageEnum
	) {}

	static createLanguageEnum(lang: string) {
		switch (lang) {
			case LanguageEnum[LanguageEnum.en]:
				return LanguageEnum.en;
			case LanguageEnum[LanguageEnum.cs]:
				return LanguageEnum.cs;
		}
		return null;
	}
}
