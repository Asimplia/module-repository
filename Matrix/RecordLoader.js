var AsimpliaRepository = require('../index');

var RecordLoader = (function () {
    function RecordLoader() {
        this.connection = AsimpliaRepository.mssqlConnection;
    }
    RecordLoader.prototype.getByClientId = function () {
    };
    return RecordLoader;
})();
module.exports = RecordLoader;
