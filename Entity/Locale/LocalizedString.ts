
export = LocalizedString;
class LocalizedString {

	private en: string;
	private cs: string;

	constructor(langsObject: { en: string; cs: string }) {
		this.en = langsObject.en;
		this.cs = langsObject.cs;
	}
}