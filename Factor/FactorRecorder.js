var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var Factor = require('../Entity/Factor/Factor');

var FactorRecorder = (function (_super) {
    __extends(FactorRecorder, _super);
    function FactorRecorder() {
        _super.call(this);
        this.FactorModel = require('./FactorModel');
    }
    FactorRecorder.prototype.insertOrUpdate = function (factor, callback) {
        var _this = this;
        this.FactorModel.findOne({ id: factor.Id }, function (e, factorDocument) {
            if (e) {
                callback(e);
                return;
            }
            if (!factorDocument) {
                factorDocument = new _this.FactorModel({});
                _this.getNextId(_this.FactorModel, function (id) {
                    factor.Id = id;
                    _this.update(factorDocument, Factor.fromObject, factor, callback);
                });
                return;
            }
            _this.update(factorDocument, Factor.fromObject, factor, callback);
        });
    };

    FactorRecorder.prototype.remove = function (id, callback) {
        this.FactorModel.findOneAndRemove({ id: id }, function (e) {
            callback(e);
        });
    };
    return FactorRecorder;
})(AbstractRecorder);
module.exports = FactorRecorder;
