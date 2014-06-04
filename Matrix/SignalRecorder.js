var AsimpliaRepository = require('../index');

var SignalRecorder = (function () {
    function SignalRecorder() {
        this.connection = AsimpliaRepository.mssqlConnection;
    }
    return SignalRecorder;
})();
module.exports = SignalRecorder;
