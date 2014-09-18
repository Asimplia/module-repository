var LanguageEnum = require('./LanguageEnum');
var EntityPreparer = require('../EntityPreparer');

var LocalizedString = (function () {
    function LocalizedString(langsObject) {
        if (!langsObject) {
            langsObject = { en: null, cs: null };
        }
        this.en = EntityPreparer.stringOrNull(langsObject.en);
        this.cs = EntityPreparer.stringOrNull(langsObject.cs);
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

    LocalizedString.prototype.translate = function (language) {
        switch (language.Enum) {
            case 0 /* cs */:
                return this.cs;
            case 1 /* en */:
                return this.en;
            default:
                throw new Error('Not implemented Language');
        }
    };

    LocalizedString.prototype.contains = function (s) {
        return (this.en === null || this.en.indexOf(s) !== -1) && (this.cs === null || this.cs.indexOf(s) !== -1);
    };

    LocalizedString.prototype.replace = function (s, t) {
        var en = this.en !== null ? this.en.replace(s, t) : null;
        var cs = this.cs !== null ? this.cs.replace(s, t) : null;
        return new LocalizedString({
            en: en, cs: cs
        });
    };

    LocalizedString.prototype.toObject = function () {
        return {
            cs: this.cs,
            en: this.en
        };
    };
    return LocalizedString;
})();
module.exports = LocalizedString;
