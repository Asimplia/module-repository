
import TerritoryEnum = require('./TerritoryEnum');
import Language = require('./Language');
import Currency = require('./Currency');

export = Locale;
class Locale {

	get Language() { return this.language; }
	get TerritoryEnum() { return this.territory; }
	get Currency() { return this.currency; }

	constructor(
		private language: Language,
		private territory: TerritoryEnum,
		private currency: Currency
	) { }
}
