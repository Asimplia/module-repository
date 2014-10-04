
import CurrencyEnum = require('./CurrencyEnum');

export = Currency;
class Currency {

	get Enum() { return this.currency; }

	constructor(
		private currency: CurrencyEnum
	) {}

	getCode(): string {
		return CurrencyEnum[this.currency];
	}
}