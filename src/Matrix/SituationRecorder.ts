
import Situation = require('../Entity/Matrix/Situation');
import moment = require('moment');
import Repository = require('../index');
import List = require('../Entity/List');
import Matrix = require('../Entity/Matrix/Matrix');
import Signal = require('../Entity/Matrix/Signal');

export = SituationRecorder;
class SituationRecorder {

	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	insert(situation: Situation, callback: (e: Error, situation?: Situation) => void) {
		this.connection.query('INSERT INTO '+Situation.TABLE_NAME+' ('+Situation.COLUMN_DATE_CREATED+', '+Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED+', '+Situation.COLUMN_DATE_SUGGESTION_RESULT_PROCESSED+')'
			+' VALUES ($1::timestamp, $2, $3) RETURNING '+Situation.COLUMN_SITUATION_ID, [
			moment(situation.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
			situation.DateSuggestionResultCreated ? moment(situation.DateSuggestionResultCreated).format('YYYY-MM-DD HH:mm:ss') : null,
			situation.DateSuggestionResultProcessed ? moment(situation.DateSuggestionResultProcessed).format('YYYY-MM-DD HH:mm:ss') : null
		], (e, res) => {
			if (e) {
				console.log(e);
				callback(e);
				return;
			}
			situation.Id = res.rows[0][Situation.COLUMN_SITUATION_ID];
			callback(null, situation);
		});
	}

	update(situation: Situation, callback: (e: Error, situation?: Situation) => void) {
		this.connection.query('UPDATE '+Situation.TABLE_NAME
			+' SET '+Situation.COLUMN_DATE_CREATED+' = $1::timestamp '
			+' , '+Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED+' = $2 '
			+' , '+Situation.COLUMN_DATE_SUGGESTION_RESULT_PROCESSED+' = $3 '
			+' WHERE '+Situation.COLUMN_SITUATION_ID+' = $4 ', [
			moment(situation.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
			situation.DateSuggestionResultCreated ? moment(situation.DateSuggestionResultCreated).format('YYYY-MM-DD HH:mm:ss') : null,
			situation.DateSuggestionResultProcessed ? moment(situation.DateSuggestionResultProcessed).format('YYYY-MM-DD HH:mm:ss') : null,
			situation.Id
		], (e, res) => {
			if (e) {
				console.log(e);
				callback(e);
				return;
			}
			callback(null, situation);
		});
	}

	removeByIds(ids: number[], callback: (e: Error) => void) {
		var sql = 'DELETE FROM '+Situation.TABLE_NAME+' '
			+' WHERE '+Situation.COLUMN_SITUATION_ID+' IN ( '+ids.join(', ')+' ) ';
		this.connection.query(sql, [], (e, result) => {
			callback(e);
		});
	}
}
