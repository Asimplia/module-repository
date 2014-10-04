var Locale = (function () {
    function Locale(language, territory, currency) {
        this.language = language;
        this.territory = territory;
        this.currency = currency;
    }
    Object.defineProperty(Locale.prototype, "Language", {
        get: function () {
            return this.language;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Locale.prototype, "TerritoryEnum", {
        get: function () {
            return this.territory;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Locale.prototype, "Currency", {
        get: function () {
            return this.currency;
        },
        enumerable: true,
        configurable: true
    });
    return Locale;
})();
module.exports = Locale;
