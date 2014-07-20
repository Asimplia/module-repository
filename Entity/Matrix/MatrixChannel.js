var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix = require('./Matrix');
var moment = require('moment');

var QuadrantValueFactory = require('./QuadrantValueFactory');

var MatrixChannel = (function (_super) {
    __extends(MatrixChannel, _super);
    function MatrixChannel(id, eShopId, type, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens, channel) {
        _super.call(this, id, eShopId, type, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens);
        this.channel = channel;
    }
    Object.defineProperty(MatrixChannel.prototype, "Channel", {
        get: function () {
            return this.channel;
        },
        enumerable: true,
        configurable: true
    });

    MatrixChannel.fromRow = function (o) {
        return new MatrixChannel(o[Matrix.COLUMN_MATRIX_ID], o[Matrix.COLUMN_E_SHOP_ID], o[Matrix.COLUMN_TYPE], o[Matrix.COLUMN_LOAD_ID], o[Matrix.COLUMN_SCORE_ABSOLUTE], o[Matrix.COLUMN_SCORE_RELATIVE], o[Matrix.COLUMN_SCORE_WEIGHT], o[Matrix.COLUMN_CHANGE_ABSOLUTE], o[Matrix.COLUMN_CHANGE_RELATIVE], o[Matrix.COLUMN_CHANGE_WEIGHT], o[Matrix.COLUMN_PREDICTION], QuadrantValueFactory.createQuadrantValueEnum(o[Matrix.COLUMN_QUADRANT]), moment(o[Matrix.COLUMN_DATE_VALID]).toDate(), o[Matrix.COLUMN_INPUT_VALUE_X], o[Matrix.COLUMN_INPUT_VALUE_Y], o[Matrix.COLUMN_CHANGE_VALUE_X], o[Matrix.COLUMN_CHANGE_VALUE_Y], o[Matrix.COLUMN_TANGENS], o[Matrix.COLUMN_CHANGE_TANGENS], null);
    };
    return MatrixChannel;
})(Matrix);
module.exports = MatrixChannel;
