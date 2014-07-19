var moment = require('moment');
var AsimpliaRepository = require('../index');

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
            _this.connection.query('INSERT INTO analytical.signal (matrixid, datecreated) VALUES ($1, $2::timestamp) RETURNING signalid', [
                signal.Record.Id, moment(signal.DateCreated).format('YYYY-MM-DD HH:mm:ss')
            ], function (e, res) {
                if (e) {
                    console.log(e);
                    return next(e);
                }
                console.log(res);
                signal.Id = res.id;
                next();
            });
        }).on('error', function (e) {
            callback(e);
        }).on('end', function () {
            callback(null, signalList);
        }).parallel(10);
    };

    SignalRecorder.prototype.getLastInsertedId = function (callback) {
        this.connection.query('SELECT SCOPE_IDENTITY() AS ID', function (e, res) {
            if (e) {
                return callback(e);
            }
            callback(null, res.pop()['ID']);
        });
    };
    return SignalRecorder;
})();
module.exports = SignalRecorder;
