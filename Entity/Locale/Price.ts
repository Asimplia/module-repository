
import Currency = require('./Currency');
import CurrencyEnum = require('./CurrencyEnum');
import EntityPreparer = require('../EntityPreparer');

export = Price;
class Price {

	private CZK: number;
	private USD: number;

	constructor(prices: { CZK: number; USD: number }) {
		this.CZK = EntityPreparer.float(prices.CZK);
		this.USD = EntityPreparer.float(prices.USD);
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
