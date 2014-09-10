var Repository = require('../index');
var Signal = require('../Entity/Matrix/Signal');
var Situation = require('../Entity/Matrix/Situation');
var Matrix = require('../Entity/Matrix/Matrix');
var List = require('../Entity/List');
var moment = require('moment');

var SituationLoader = (function () {
    function SituationLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    SituationLoader.prototype.getListNotSuggestedByEShopId = function (eShopId, callback) {
        var _this = this;
        this.connection.query('SELECT * FROM analytical.' + Situation.TABLE_NAME + ' JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Signal.COLUMN_SITUATION_ID + ') ' + ' JOIN analytical.' + Matrix.TABLE_NAME + ' USING (' + Signal.COLUMN_MATRIX_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED + ' IS NULL', [
            eShopId
        ], function (e, result) {
            _this.createListByResult(e, result, callback);
        });
    };

    SituationLoader.prototype.getListByEShopIdAndLoadIdLimited = function (eShopId, loadId, limit, offset, callback) {
        var _this = this;
        this.connection.query('SELECT * FROM analytical.' + Situation.TABLE_NAME + ' JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Signal.COLUMN_SITUATION_ID + ') ' + ' JOIN analytical.' + Matrix.TABLE_NAME + ' USING (' + Signal.COLUMN_MATRIX_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ' + ' LIMIT $3 OFFSET $4 ', [
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
                situation = new Situation(row[Situation.COLUMN_SITUATION_ID], new List(), moment(row[Situation.COLUMN_DATE_CREATED]).toDate(), row[Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED] ? moment(row[Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED]).toDate() : null);
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
