var FactorValue = (function () {
    function FactorValue(value) {
        this.value = value;
    }
    FactorValue.prototype.toString = function () {
        return this.value;
    };
    return FactorValue;
})();
module.exports = FactorValue;
