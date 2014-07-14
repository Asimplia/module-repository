var AsimpliaRepository = require('../index');
var List = require('../Entity/List');

var MatrixProduct = require('../Entity/Matrix/MatrixProduct');

var RecordLoader = (function () {
    function RecordLoader() {
        var _this = this;
        AsimpliaRepository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    RecordLoader.prototype.getListByEShopId = function (eShopId, callback) {
        this.connection.query('SELECT * FROM Matrix JOIN MatrixProduct USING (MatrixID) WHERE EShopID = ?', [eShopId], function (e, recordset) {
            if (e) {
                return callback(e);
            }
            var list = new List();
            recordset.forEach(function (row) {
                var record = MatrixProduct.fromRow(row);
                list.push(record);
            });
            callback(null, list);
        });
    };
    return RecordLoader;
})();
module.exports = RecordLoader;
