var Situation = require('../Entity/Matrix/Situation');
var moment = require('moment');
var Repository = require('../index');

var SituationRecorder = (function () {
    function SituationRecorder() {
        var _this = this;
        Repository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    SituationRecorder.prototype.insert = function (situation, callback) {
        this.connection.query('INSERT INTO analytical.' + Situation.TABLE_NAME + ' (' + Situation.COLUMN_DATE_CREATED + ')' + ' VALUES ($1::timestamp) RETURNING ' + Situation.COLUMN_SITUATION_ID, [
            moment(situation.DateCreated).format('YYYY-MM-DD HH:mm:ss')
        ], function (e, res) {
            if (e) {
                console.log(e);
                callback(e);
                return;
            }
            situation.Id = res.rows[0][Situation.COLUMN_SITUATION_ID];
            callback(null, situation);
        });
    };
    return SituationRecorder;
})();
module.exports = SituationRecorder;
