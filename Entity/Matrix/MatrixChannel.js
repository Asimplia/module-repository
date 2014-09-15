var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix = require('./Matrix');
var moment = require('moment');
var Channel = require('../EShop/Channel');

var QuadrantValueFactory = require('./QuadrantValueFactory');

var SectionFactory = require('../Section/SectionFactory');

var MatrixChannel = (function (_super) {
    __extends(MatrixChannel, _super);
    function MatrixChannel(id, eShopId, section, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens, channel) {
        _super.call(this, id, eShopId, section, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight, prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens);
        this.channel = channel;
    }
    Object.defineProperty(MatrixChannel.prototype, "Channel", {
        get: function () {
            return this.channel;
        },
        enumerable: true,
        configurable: true
    });

    MatrixChannel.toObject = function (e) {
        var o = Matrix.toObject(e);
        o.channel = e.channel.toObject();
        return o;
    };

    MatrixChannel.prototype.toObject = function () {
        return MatrixChannel.toObject(this);
    };

    MatrixChannel.fromRow = function (o) {
        return new MatrixChannel(parseInt(o[Matrix.COLUMN_MATRIX_ID]), parseInt(o[Matrix.COLUMN_E_SHOP_ID]), SectionFactory.createSectionEnum(o[Matrix.COLUMN_SECTION]), parseInt(o[Matrix.COLUMN_LOAD_ID]), parseFloat(o[Matrix.COLUMN_SCORE_ABSOLUTE]), parseFloat(o[Matrix.COLUMN_SCORE_RELATIVE]), parseFloat(o[Matrix.COLUMN_SCORE_WEIGHT]), parseFloat(o[Matrix.COLUMN_CHANGE_ABSOLUTE]), parseFloat(o[Matrix.COLUMN_CHANGE_RELATIVE]), parseFloat(o[Matrix.COLUMN_CHANGE_WEIGHT]), parseFloat(o[Matrix.COLUMN_PREDICTION]), QuadrantValueFactory.createQuadrantValueEnum(o[Matrix.COLUMN_QUADRANT]), moment(o[Matrix.COLUMN_DATE_VALID]).toDate(), parseFloat(o[Matrix.COLUMN_INPUT_VALUE_X]), parseFloat(o[Matrix.COLUMN_INPUT_VALUE_Y]), parseFloat(o[Matrix.COLUMN_CHANGE_VALUE_X]), parseFloat(o[Matrix.COLUMN_CHANGE_VALUE_Y]), parseFloat(o[Matrix.COLUMN_TANGENS]), parseFloat(o[Matrix.COLUMN_CHANGE_TANGENS]), Channel.fromRow(o));
    };

    MatrixChannel.prototype.isCorresponding = function (matrix) {
        if (matrix instanceof MatrixChannel) {
            return this.Channel.Id == matrix.Channel.Id;
        }
        return false;
    };
    return MatrixChannel;
})(Matrix);
module.exports = MatrixChannel;
