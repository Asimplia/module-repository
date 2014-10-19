var Repository = require('../index');
var List = require('../Entity/List');
var Channel = require('../Entity/EShop/Channel');
var Matrix = require('../Entity/Matrix/Matrix');
var EntityPreparer = require('../Entity/EntityPreparer');

var ChannelLoader = (function () {
    function ChannelLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    ChannelLoader.prototype.getListByEShopIdAndLoadIdInMatrixes = function (eShopId, loadId, callback) {
        var _this = this;
        var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(Channel).join(', ') + ' FROM ' + Channel.TABLE_NAME + ' ' + ' JOIN ' + Matrix.TABLE_NAME + ' ' + ' ON ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANNEL_ID + ' = ' + Channel.TABLE_NAME + '.' + Channel.COLUMN_CHANNEL_ID + ' ' + ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = ' + Channel.TABLE_NAME + '.' + Channel.COLUMN_E_SHOP_ID + ' ' + ' WHERE ' + Channel.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' GROUP BY ' + Channel.TABLE_NAME + '.' + Channel.COLUMN_E_SHOP_ID + ', ' + Channel.TABLE_NAME + '.' + Channel.COLUMN_CHANNEL_ID + ' ' + ' ORDER BY ' + Channel.TABLE_NAME + '.' + Channel.COLUMN_CHANNEL_ID + ' ';
        this.connection.query(sql, [eShopId, loadId], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    ChannelLoader.prototype.getListCreatedFrom = function (createdDateFrom, callback) {
        var _this = this;
        var where = ['TRUE'];
        var parameters = [];
        if (createdDateFrom) {
            where.push(Channel.COLUMN_DATE_CREATED + ' > $1::timestamp');
            parameters.push(createdDateFrom);
        }
        var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(Channel).join(', ') + ' ' + ' FROM ' + Channel.TABLE_NAME + ' ' + ' WHERE ' + where.join(' AND ');
        this.connection.query(sql, parameters, function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    ChannelLoader.prototype.createListByResult = function (e, result, callback) {
        if (e) {
            console.log(e);
            callback(e);
            return;
        }
        var list = new List();
        result.rows.forEach(function (row) {
            var record = Channel.fromRow(row);
            list.push(record);
        });
        callback(null, list);
    };
    return ChannelLoader;
})();
module.exports = ChannelLoader;
