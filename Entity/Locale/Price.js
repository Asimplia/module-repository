var CurrencyEnum = require('./CurrencyEnum');

var Price = (function () {
    function Price(prices) {
        this.CZK = prices.CZK;
        this.USD = prices.USD;
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
