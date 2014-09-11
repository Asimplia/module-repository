var moment = require('moment');
var AsimpliaRepository = require('../index');
var Signal = require('../Entity/Matrix/Signal');
var Matrix = require('../Entity/Matrix/Matrix');

var SignalRecorder = (function () {
    function SignalRecorder() {
        var _this = this;
        AsimpliaRepository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    SignalRecorder.prototype.insertList = function (signalList, callback) {
        var _this = this;
        signalList.createEach().on('item', function (signal, i, next) {
            _this.insert(signal, next);
        }).on('error', function (e) {
            callback(e);
        }).on('end', function () {
            callback(null, signalList);
        }).parallel(10);
    };

    SignalRecorder.prototype.insert = function (signal, callback) {
        this.connection.query('INSERT INTO analytical.' + Signal.TABLE_NAME + ' (' + Signal.COLUMN_MATRIX_ID + ', ' + Signal.COLUMN_DATE_CREATED + ', ' + Signal.COLUMN_SITUATION_ID + ')' + ' VALUES ($1, $2::timestamp, $3) RETURNING ' + Signal.COLUMN_SIGNAL_ID, [
            signal.Matrix.Id,
            moment(signal.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
            signal.SituationId
        ], function (e, res) {
            if (e) {
                console.log(e);
                callback(e);
                return;
            }
            signal.Id = res.rows[0][Signal.COLUMN_SIGNAL_ID];
            callback(null, signal);
        });
    };

    SignalRecorder.prototype.update = function (signal, callback) {
        this.connection.query('UPDATE analytical.' + Signal.TABLE_NAME + ' SET ' + Signal.COLUMN_MATRIX_ID + ' = $1' + ', ' + Signal.COLUMN_DATE_CREATED + ' = $2::timestamp' + ', ' + Signal.COLUMN_SITUATION_ID + ' = $3' + ' WHERE ' + Signal.COLUMN_SIGNAL_ID + ' = $4', [
            signal.Matrix.Id,
            moment(signal.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
            signal.SituationId,
            signal.Id
        ], function (e, res) {
            if (e) {
                console.log(e);
                callback(e);
                return;
            }
            callback(null, signal);
        });
    };

    SignalRecorder.prototype.removeByEShopIdAndLoadId = function (eShopId, loadId, callback) {
        this.connection.query('DELETE FROM analytical.' + Signal.TABLE_NAME + ' JOIN analytical.' + Matrix.TABLE_NAME + ' USING (' + Signal.COLUMN_MATRIX_ID + ') ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ', [
            eShopId, loadId
        ], function (e, result) {
            callback(e);
        });
    };
    return SignalRecorder;
})();
module.exports = SignalRecorder;
