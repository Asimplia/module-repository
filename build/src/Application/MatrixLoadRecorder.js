var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var MatrixLoad = require('../Entity/Application/MatrixLoad');

var MatrixLoadModel = require('../Definition/Application/MatrixLoadModel');

var MatrixLoadRecorder = (function (_super) {
    __extends(MatrixLoadRecorder, _super);
    function MatrixLoadRecorder() {
        _super.call(this);
        this.model = MatrixLoadModel;
    }
    MatrixLoadRecorder.prototype.insertOrUpdateList = function (matrixLoadList, callback) {
        var _this = this;
        matrixLoadList.createEach().on('item', function (matrixLoad, next) {
            _this.insertOrUpdate(matrixLoad, next);
        }).on('error', function (e) {
            callback(e);
        }).on('end', function () {
            callback(null, matrixLoadList);
        });
    };

    MatrixLoadRecorder.prototype.insertOrUpdate = function (matrixLoad, callback) {
        var _this = this;
        this.model.findOne({ id: matrixLoad.Id, eShopId: matrixLoad.EShopId }, function (e, doc) {
            if (e) {
                callback(e);
                return;
            }
            if (!doc) {
                doc = new _this.model({});
                _this.getNextId(_this.model, function (id) {
                    matrixLoad.Id = id;
                    _this.update(doc, MatrixLoad.fromObject, matrixLoad, callback);
                });
                return;
            }
            _this.update(doc, MatrixLoad.fromObject, matrixLoad, callback);
        });
    };
    return MatrixLoadRecorder;
})(AbstractRecorder);
module.exports = MatrixLoadRecorder;
