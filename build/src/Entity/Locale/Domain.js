var Domain = (function () {
    function Domain(domain, locale) {
        this.domain = domain;
        this.locale = locale;
    }
    Object.defineProperty(Domain.prototype, "Domain", {
        get: function () {
            return this.domain;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Domain.prototype, "Locale", {
        get: function () {
            return this.locale;
        },
        enumerable: true,
        configurable: true
    });
    return Domain;
})();
module.exports = Domain;
