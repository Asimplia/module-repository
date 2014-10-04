var CurrencyEnum = require('./CurrencyEnum');
var EntityPreparer = require('../EntityPreparer');

var Price = (function () {
    function Price(prices) {
        this.CZK = EntityPreparer.float(prices.CZK);
        this.USD = EntityPreparer.float(prices.USD);
    }
    Price.prototype.getByCurrency = function (currency) {
        switch (currency.Enum) {
            case 0 /* CZK */:
                return this.CZK;
            case 1 /* USD */:
                return this.USD;
            default:
                throw new Error('Not implemented Currency');
        }
    };
    return Price;
})();
module.exports = Price;
