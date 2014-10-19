var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var Matrix = require('../Entity/Application/Matrix');

var MatrixModel = require('../Definition/Application/MatrixModel');

var MatrixRecorder = (function (_super) {
    __extends(MatrixRecorder, _super);
    function MatrixRecorder() {
        _super.call(this);
        this.model = MatrixModel;
    }
    MatrixRecorder.prototype.insertOrUpdateList = function (matrixList, callback) {
        var _this = this;
        matrixList.createEach().on('item', function (matrix, next) {
            _this.insertOrUpdate(matrix, next);
        }).on('error', function (e) {
            callback(e);
        }).on('end', function () {
            callback(null, matrixList);
        });
    };

    MatrixRecorder.prototype.insertOrUpdate = function (matrix, callback) {
        var _this = this;
        this.model.findOne({ id: matrix.Id }, function (e, matrixDocument) {
            if (e) {
                callback(e);
                return;
            }
            if (!matrixDocument) {
                matrixDocument = new _this.model({});
                _this.getNextId(_this.model, function (id) {
                    matrix.Id = id;
                    _this.update(matrixDocument, Matrix.fromObject, matrix, callback);
                });
                return;
            }
            _this.update(matrixDocument, Matrix.fromObject, matrix, callback);
        });
    };
    return MatrixRecorder;
})(AbstractRecorder);
module.exports = MatrixRecorder;
