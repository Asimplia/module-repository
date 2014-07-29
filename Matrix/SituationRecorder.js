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
        this.connection.query('INSERT INTO analytical.' + Situation.TABLE_NAME + ' (' + Situation.COLUMN_DATE_CREATED + ', ' + Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED + ')' + ' VALUES ($1::timestamp, $2) RETURNING ' + Situation.COLUMN_SITUATION_ID, [
            moment(situation.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
            situation.DateSuggestionResultCreated ? moment(situation.DateSuggestionResultCreated).format('YYYY-MM-DD HH:mm:ss') : null
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

    SituationRecorder.prototype.update = function (situation, callback) {
        this.connection.query('UPDATE analytical.' + Situation.TABLE_NAME + ' SET ' + Situation.COLUMN_DATE_CREATED + ' = $1::timestamp ' + ' , ' + Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED + ' = $2 ' + ' WHERE ' + Situation.COLUMN_SITUATION_ID + ' = $3 ', [
            moment(situation.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
            situation.DateSuggestionResultCreated ? moment(situation.DateSuggestionResultCreated).format('YYYY-MM-DD HH:mm:ss') : null,
            situation.Id
        ], function (e, res) {
            if (e) {
                console.log(e);
                callback(e);
                return;
            }
            callback(null, situation);
        });
    };
    return SituationRecorder;
})();
module.exports = SituationRecorder;
