var LocalizedString = (function () {
    function LocalizedString(langsObject) {
        if (!langsObject) {
            return;
        }
        this.en = langsObject.en;
        this.cs = langsObject.cs;
    }
    Object.defineProperty(LocalizedString.prototype, "Cs", {
        get: function () {
            return this.cs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LocalizedString.prototype, "En", {
        get: function () {
            return this.en;
        },
        enumerable: true,
        configurable: true
    });

    LocalizedString.prototype.contains = function (s) {
        return this.en !== null && this.cs !== null && this.en.indexOf(s) !== -1 && this.cs.indexOf(s) !== -1;
    };

    LocalizedString.prototype.replace = function (s, t) {
        var en = this.en !== null ? this.en.replace(s, t) : null;
        var cs = this.cs !== null ? this.cs.replace(s, t) : null;
        return new LocalizedString({
            en: en, cs: cs
        });
    };
    return LocalizedString;
})();
module.exports = LocalizedString;
