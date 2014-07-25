var Repository = require('../index');
var Signal = require('../Entity/Matrix/Signal');
var Situation = require('../Entity/Matrix/Situation');
var Matrix = require('../Entity/Matrix/Matrix');
var List = require('../Entity/List');

var SituationLoader = (function () {
    function SituationLoader() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    SituationLoader.prototype.getListByEShopId = function (eShopId, callback) {
        this.connection.query('SELECT * FROM analytical.' + Situation.TABLE_NAME + ' JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Signal.COLUMN_SITUATION_ID + ') ' + ' JOIN analytical.' + Matrix.TABLE_NAME + ' USING (' + Signal.COLUMN_MATRIX_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1', [
            eShopId
        ], function (e, result) {
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
                    situation = new Situation(row[Situation.COLUMN_SITUATION_ID], new List(), row[Situation.COLUMN_DATE_CREATED]);
                    situationList.push(situation);
                }
                var signal = Signal.fromRow(row);
                situation.SignalList.push(signal);
            });
            callback(null, situationList);
        });
    };
    return SituationLoader;
})();
module.exports = SituationLoader;
