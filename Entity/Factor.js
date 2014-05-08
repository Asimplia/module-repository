var Factor = (function () {
    function Factor() {
    }
    Factor.fromObject = function (o /*FactorObject*/ ) {
        return new Factor();
    };

    Factor.toObject = function (entity) {
        return {};
    };

    Factor.prototype.toObject = function () {
        return Factor.toObject(this);
    };
    return Factor;
})();
module.exports = Factor;
//# sourceMappingURL=Factor.js.map
