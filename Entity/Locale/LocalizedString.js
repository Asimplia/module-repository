var LocalizedString = (function () {
    function LocalizedString(langsObject) {
        if (!langsObject) {
            return;
        }
        this.en = langsObject.en;
        this.cs = langsObject.cs;
    }
    LocalizedString.prototype.contains = function (s) {
        return this.en.indexOf(s) !== -1 && this.cs.indexOf(s) !== -1;
    };

    LocalizedString.prototype.replace = function (s, t) {
        var en = this.en.replace(s, t);
        var cs = this.cs.replace(s, t);
        return new LocalizedString({
            en: en, cs: cs
        });
    };
    return LocalizedString;
})();
module.exports = LocalizedString;
