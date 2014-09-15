var LanguageEnum = require('./LanguageEnum');

var Language = (function () {
    function Language(language) {
        this.language = language;
    }
    Object.defineProperty(Language.prototype, "Enum", {
        get: function () {
            return this.language;
        },
        enumerable: true,
        configurable: true
    });

    Language.createLanguageEnum = function (lang) {
        switch (lang) {
            case LanguageEnum[1 /* en */]:
                return 1 /* en */;
            case LanguageEnum[0 /* cs */]:
                return 0 /* cs */;
        }
        return null;
    };
    return Language;
})();
module.exports = Language;
