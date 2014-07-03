var AsimpliaRepository = require('../index');
var List = require('../Entity/List');

var MatrixProduct = require('../Entity/Matrix/MatrixProduct');

var RecordLoader = (function () {
    function RecordLoader() {
    }
    RecordLoader.prototype.getListByEShopId = function (eShopId, callback) {
        AsimpliaRepository.mssqlConnection.query('SELECT * FROM Matrix JOIN MatrixProduct USING (MatrixID) WHERE EShopID = ?', [eShopId], function (e, recordset) {
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
