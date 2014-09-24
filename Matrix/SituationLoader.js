var Repository = require('../index');
var Signal = require('../Entity/Matrix/Signal');
var Situation = require('../Entity/Matrix/Situation');
var Matrix = require('../Entity/Matrix/Matrix');
var Product = require('../Entity/EShop/Product');
var Customer = require('../Entity/EShop/Customer');
var Channel = require('../Entity/EShop/Channel');
var List = require('../Entity/List');

var SituationLoader = (function () {
    function SituationLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    SituationLoader.prototype.getListNotSuggestedByEShopId = function (eShopId, callback) {
        var _this = this;
        this.connection.query('SELECT * FROM analytical.' + Situation.TABLE_NAME + ' ' + ' JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Signal.COLUMN_SITUATION_ID + ') ' + ' JOIN analytical.' + Matrix.TABLE_NAME + ' USING (' + Signal.COLUMN_MATRIX_ID + ') ' + ' LEFT JOIN warehouse.' + Product.TABLE_NAME + ' USING (' + Product.COLUMN_PRODUCT_ID + ', ' + Product.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Customer.TABLE_NAME + ' USING (' + Customer.COLUMN_CUSTOMER_ID + ', ' + Customer.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Channel.TABLE_NAME + ' USING (' + Channel.COLUMN_CHANNEL_ID + ', ' + Channel.COLUMN_E_SHOP_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED + ' IS NULL', [
            eShopId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    SituationLoader.prototype.getListByEShopIdAndLoadIdLimited = function (eShopId, loadId, limit, offset, filter, callback) {
        var _this = this;
        var filterWhere = '';
        if (filter.productIds && filter.productIds.length > 0) {
            filterWhere += ' AND analytical.' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_PRODUCT_ID + ' IN (' + filter.productIds.join(', ') + ') ';
        }
        if (filter.customerIds && filter.customerIds.length > 0) {
            filterWhere += ' AND analytical.' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CUSTOMER_ID + ' IN (' + filter.customerIds.join(', ') + ') ';
        }
        if (filter.channelIds && filter.channelIds.length > 0) {
            filterWhere += ' AND analytical.' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANNEL_ID + ' IN (' + filter.channelIds.join(', ') + ') ';
        }
        this.connection.query('SELECT * FROM analytical.' + Situation.TABLE_NAME + ' ' + ' JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Signal.COLUMN_SITUATION_ID + ') ' + ' JOIN analytical.' + Matrix.TABLE_NAME + ' USING (' + Signal.COLUMN_MATRIX_ID + ') ' + ' LEFT JOIN warehouse.' + Product.TABLE_NAME + ' USING (' + Product.COLUMN_PRODUCT_ID + ', ' + Product.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Customer.TABLE_NAME + ' USING (' + Customer.COLUMN_CUSTOMER_ID + ', ' + Customer.COLUMN_E_SHOP_ID + ') ' + ' LEFT JOIN warehouse.' + Channel.TABLE_NAME + ' USING (' + Channel.COLUMN_CHANNEL_ID + ', ' + Channel.COLUMN_E_SHOP_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + filterWhere + ' LIMIT $3 OFFSET $4 ', [
            eShopId, loadId, limit, offset
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    SituationLoader.prototype.createListByResult = function (e, result, callback) {
        if (e) {
            callback(e);
            return;
        }
        var situationList = new List();
        result.rows.forEach(function (row) {
            var situation = situationList.find(function (situation) {
                return situation.Id == row[Situation.COLUMN_SITUATION_ID];
            });
            if (!situation) {
                situation = Situation.fromRow(row);
                situationList.push(situation);
            }
            var signal = Signal.fromRow(row);
            situation.SignalList.push(signal);
        });
        callback(null, situationList);
    };
    return SituationLoader;
})();
module.exports = SituationLoader;
