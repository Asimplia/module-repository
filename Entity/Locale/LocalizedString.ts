﻿
import Language = require('./Language');
import LanguageEnum = require('./LanguageEnum');

export = LocalizedString;
class LocalizedString {

	private en: string;
	private cs: string;

	get Cs() { return this.cs; }
	get En() { return this.en; }

	constructor(langsObject: { en: string; cs: string }) {
		if (!langsObject) {
			return;
		}
		this.en = typeof langsObject.en !== 'undefined' ? langsObject.en : null;
		this.cs = typeof langsObject.cs !== 'undefined' ? langsObject.cs : null;
	}

	translate(language: Language) {
		switch (language.Enum) {
			case LanguageEnum.cs:
				return this.cs;
			case LanguageEnum.en:
				return this.en;
			default:
				throw new Error('Not implemented Language');
		}
	}

	contains(s: string): boolean {
		return (this.en === null || this.en.indexOf(s) !== -1)
			&& (this.cs === null || this.cs.indexOf(s) !== -1);
	}

	replace(s: string, t: string): LocalizedString {
		var en = this.en !== null ? this.en.replace(s, t) : null;
		var cs = this.cs !== null ? this.cs.replace(s, t) : null;
		return new LocalizedString({
			en: en, cs: cs
		});
	}

	toObject() {
		return {
			cs: this.cs,
			en: this.en
		};
	}
}
