/// <refernce path="../../typings/mongoose/mongoose.d.ts" />
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
            callback(e, list);
        });
    };
    return FactorLoader;
})();
module.exports = FactorLoader;
//# sourceMappingURL=FactorLoader.js.map
