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
            _this.connection.query('INSERT INTO Signal (MatrixID, DateCreated) VALUES (?, ?)', [
                signal.Record.Id, moment(signal.DateCreated).format('YYYY-MM-DD HH:mm:SS')
            ], function (e, res) {
                if (e) {
                    console.log(e);
                    return next(e);
                }
                _this.getLastInsertedId(function (e, id) {
                    if (e) {
                        return next(e);
                    }
                    signal.Id = id;
                    next();
                });
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
