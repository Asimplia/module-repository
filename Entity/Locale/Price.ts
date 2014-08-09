
import Currency = require('./Currency');
import CurrencyEnum = require('./CurrencyEnum');

export = Price;
class Price {

	private CZK: number;
	private USD: number;

	constructor(prices: { CZK: number; USD: number }) {
		this.CZK = prices.CZK;
		this.USD = prices.USD;
	}

	getByCurrency(currency: Currency) {
		switch (currency.Enum) {
			case CurrencyEnum.CZK:
				return this.CZK;
			case CurrencyEnum.USD:
				return this.USD;
			default:
				throw new Error('Not implemented Currency');
		}
	}
}
