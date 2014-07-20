var moment = require('moment');
var AsimpliaRepository = require('../index');
var Signal = require('../Entity/Matrix/Signal');

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
            _this.connection.query('INSERT INTO analytical.' + Signal.TABLE_NAME + ' (' + Signal.COLUMN_MATRIX_ID + ', ' + Signal.COLUMN_DATE_CREATED + ') ' + 'VALUES ($1, $2::timestamp) RETURNING ' + Signal.COLUMN_SIGNAL_ID, [
                signal.Matrix.Id, moment(signal.DateCreated).format('YYYY-MM-DD HH:mm:ss')
            ], function (e, res) {
                if (e) {
                    console.log(e);
                    return next(e);
                }
                signal.Id = res.rows[0][Signal.COLUMN_SIGNAL_ID];
                next();
            });
        }).on('error', function (e) {
            callback(e);
        }).on('end', function () {
            callback(null, signalList);
        }).parallel(10);
    };
    return SignalRecorder;
})();
module.exports = SignalRecorder;
