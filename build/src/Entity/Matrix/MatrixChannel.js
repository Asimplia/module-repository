var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Matrix = require('./Matrix');

var Channel = require('../EShop/Channel');

var QuadrantValueFactory = require('./QuadrantValueFactory');

var SectionFactory = require('../Section/SectionFactory');
var EntityPreparer = require('../EntityPreparer');

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
        return new MatrixChannel(EntityPreparer.intOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_MATRIX_ID]), EntityPreparer.int(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID]), SectionFactory.createSectionEnum(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SECTION]), EntityPreparer.int(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID]), EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SCORE_ABSOLUTE]), EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SCORE_RELATIVE]), EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SCORE_WEIGHT]), EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_ABSOLUTE]), EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_RELATIVE]), EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_WEIGHT]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_PREDICTION]), QuadrantValueFactory.createQuadrantValueEnum(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_QUADRANT]), EntityPreparer.date(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_DATE_VALID]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_INPUT_VALUE_X]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_INPUT_VALUE_Y]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_VALUE_X]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_VALUE_Y]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_TANGENS]), EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_TANGENS]), Channel.fromRow(o));
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
