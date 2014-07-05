
export = LocalizedString;
class LocalizedString {

	private en: string;
	private cs: string;

	constructor(langsObject: { en: string; cs: string }) {
		if (!langsObject) {
			return;
		}
		this.en = langsObject.en;
		this.cs = langsObject.cs;
	}

	contains(s: string): boolean {
		return this.en.indexOf(s) !== -1 && this.cs.indexOf(s) !== -1;
	}

	replace(s: string, t: string): LocalizedString {
		var en = this.en.replace(s, t);
		var cs = this.cs.replace(s, t);
		return new LocalizedString({
			en: en, cs: cs
		});
	}
}
