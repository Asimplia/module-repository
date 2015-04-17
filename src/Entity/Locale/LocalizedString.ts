
import Language = require('./Language');
import LanguageEnum = require('./LanguageEnum');
import ILocalizedStringObject = require('./ILocalizedStringObject');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
/* tslint:disable */
Util;
/* tslint:enable */

export = LocalizedString;
class LocalizedString {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		cs: Type.String,
		en: Type.String
	};

	get Cs() { return this.object.cs; }
	get En() { return this.object.en; }

	constructor(private object: ILocalizedStringObject) {
		if (!this.object) {
			this.object = { en: null, cs: null };
		}
	}

	translate(language: Language) {
		switch (language.Enum) {
			case LanguageEnum.cs:
				return this.object.cs;
			case LanguageEnum.en:
				return this.object.en;
			default:
				throw new Error('Not implemented Language');
		}
	}

	contains(s: string): boolean {
		return (this.object.en === null || this.object.en.indexOf(s) !== -1)
			&& (this.object.cs === null || this.object.cs.indexOf(s) !== -1);
	}

	replace(s: string, t: string): LocalizedString {
		var en = this.object.en !== null ? this.object.en.replace(s, t) : null;
		var cs = this.object.cs !== null ? this.object.cs.replace(s, t) : null;
		return new LocalizedString({
			en: en, cs: cs
		});
	}

	toObject(): ILocalizedStringObject {
		return {
			cs: this.object.cs,
			en: this.object.en
		};
	}
}
