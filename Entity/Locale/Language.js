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
    return Language;
})();
module.exports = Language;
