var LocalizedString = (function () {
    function LocalizedString(langsObject) {
        if (!langsObject) {
            return;
        }
        this.en = langsObject.en;
        this.cs = langsObject.cs;
    }
    return LocalizedString;
})();
module.exports = LocalizedString;
//# sourceMappingURL=LocalizedString.js.map
