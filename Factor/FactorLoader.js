var Factor = require('../Entity/Factor/Factor');
var List = require('../Entity/List');

var FactorLoader = (function () {
    function FactorLoader() {
        this.FactorModel = require('./FactorModel');
    }
    FactorLoader.prototype.getList = function (callback) {
        this.FactorModel.find({}, null, { sort: 'id' }, function (e, factors) {
            if (e) {
                return callback(e);
            }
            var list = new List();
            list.pushArray(factors, Factor.fromObject);
            callback(null, list);
        });
    };
    return FactorLoader;
})();
module.exports = FactorLoader;
