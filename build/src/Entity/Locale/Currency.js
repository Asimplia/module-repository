var CurrencyEnum = require('./CurrencyEnum');

var Currency = (function () {
    function Currency(currency) {
        this.currency = currency;
    }
    Object.defineProperty(Currency.prototype, "Enum", {
        get: function () {
            return this.currency;
        },
        enumerable: true,
        configurable: true
    });

    Currency.prototype.getCode = function () {
        return CurrencyEnum[this.currency];
    };
    return Currency;
})();
module.exports = Currency;
