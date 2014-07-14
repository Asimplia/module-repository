var AsimpliaRepository = require('../index');
var Signal = require('../Entity/Matrix/Signal');
var List = require('../Entity/List');

var SignalLoader = (function () {
    function SignalLoader() {
        var _this = this;
        AsimpliaRepository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    SignalLoader.prototype.getListByEShopId = function (eShopId, callback) {
        this.connection.query('SELECT * FROM Signal JOIN MatrixProduct USING (MatrixID) WHERE EShopID = ?', [
            eShopId
        ], function (e, recordset) {
            if (e) {
                return callback(e);
            }
            var list = new List();
            recordset.forEach(function (row) {
                var signal = Signal.fromRow(row);
                list.push(signal);
            });
            callback(null, list);
        });
    };
    return SignalLoader;
})();
module.exports = SignalLoader;
