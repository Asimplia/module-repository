var AsimpliaRepository = require('../index');

var Matrix = require('../Entity/Matrix/Matrix');

var MatrixRecorder = (function () {
    function MatrixRecorder() {
        var _this = this;
        AsimpliaRepository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    MatrixRecorder.prototype.removeByEShopIdAndLoadId = function (eShopId, loadId, callback) {
        var sql = 'DELETE FROM ' + Matrix.TABLE_NAME + ' ' + ' WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 ' + ' AND ' + Matrix.COLUMN_LOAD_ID + ' = $2 ';
        this.connection.query(sql, [
            eShopId, loadId
        ], function (e, result) {
            callback(e);
        });
    };
    return MatrixRecorder;
})();
module.exports = MatrixRecorder;
