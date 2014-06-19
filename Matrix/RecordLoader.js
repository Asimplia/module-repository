var AsimpliaRepository = require('../index');

var RecordLoader = (function () {
    function RecordLoader() {
    }
    RecordLoader.prototype.getListByEShopId = function (eShopId, callback) {
        AsimpliaRepository.mssqlConnection.query("SELECT * FROM CMatrix", function (e, recordset) {
            if (e) {
                console.error(e);
                return callback(e);
            }
            console.dir(recordset);
        });
    };
    return RecordLoader;
})();
module.exports = RecordLoader;
