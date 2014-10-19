var MatrixLoad = require('../Entity/Application/MatrixLoad');

var MatrixLoadModel = require('../Definition/Application/MatrixLoadModel');

var MatrixLoadLoader = (function () {
    function MatrixLoadLoader() {
        this.model = MatrixLoadModel;
    }
    MatrixLoadLoader.prototype.getById = function (eShopId, id, callback) {
        this.model.findOne({ "id": id, "eShopId": eShopId }, function (e, object) {
            if (e) {
                callback(e);
                return;
            }
            if (!object) {
                callback(null, null);
                return;
            }
            callback(null, MatrixLoad.fromObject(object));
        });
    };

    MatrixLoadLoader.prototype.getCount = function (eShopId, callback) {
        this.model.count({ "eShopId": eShopId }, function (e, count) {
            if (e) {
                callback(e);
                return;
            }
            callback(e, count);
        });
    };

    MatrixLoadLoader.prototype.getMaxDateLoaded = function (callback) {
        this.model.findOne({}).sort({ 'dateLoaded': -1 }).exec(function (e, object) {
            if (e) {
                callback(e);
                return;
            }
            if (!object) {
                callback(null, null);
                return;
            }
            callback(null, object.dateLoaded);
        });
    };
    return MatrixLoadLoader;
})();
module.exports = MatrixLoadLoader;
