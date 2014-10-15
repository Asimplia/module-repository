var Matrix = require('../Entity/Application/Matrix');

var MatrixModel = require('./MatrixModel');
var List = require('../Entity/List');

var MatrixLoader = (function () {
    function MatrixLoader() {
        this.model = MatrixModel;
    }
    MatrixLoader.prototype.getListLastByProductId = function (eShopId, productId, callback) {
        var _this = this;
        this.model.findOne({ "eShopId": eShopId, "productId": productId }, null, { sortBy: "-loadId" }, function (e, maxMatrix) {
            if (e) {
                callback(e);
                return;
            }
            if (!maxMatrix) {
                callback(null, new List());
                return;
            }
            var maxLoadId = maxMatrix.loadId;
            _this.model.find({ "eShopId": eShopId, "productId": productId, "loadId": maxLoadId }, function (e, objects) {
                if (e) {
                    callback(e);
                    return;
                }
                var matrixList = new List(objects, Matrix.fromObject);
                callback(null, matrixList);
            });
        });
    };
    return MatrixLoader;
})();
module.exports = MatrixLoader;
