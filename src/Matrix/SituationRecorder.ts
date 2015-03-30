
import Situation = require('../Entity/Matrix/Situation');
import SqlExecutor = require('../Util/SqlExecutor');
import Util = require('asimplia-util');
import moment = require('moment');
import DateFactory = Util.DateTime.DateFactory;
/* tslint:disable */
Util;
/* tslint:enable */

export = SituationRecorder;
class SituationRecorder {

	private sqlExecutor: SqlExecutor;

	static $inject = [
		'connection.postgres',
		DateFactory,
	];
	constructor(
		private connection: any,
		private dateFactory: DateFactory
	) {
		this.sqlExecutor = new SqlExecutor(connection, Situation, Situation.COLUMN_SITUATION_ID, 'id');
	}

	insert(situation: Situation, callback: (e: Error, situation?: Situation) => void) {
		this.connection.query('INSERT INTO ' + Situation.TABLE_NAME + ' (' + Situation.COLUMN_DATE_CREATED + ', '
			+ Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED + ', '
			+ Situation.COLUMN_DATE_SUGGESTION_RESULT_PROCESSED + ')'
			+ ' VALUES ($1::timestamp, $2, $3) RETURNING ' + Situation.COLUMN_SITUATION_ID, [
			moment(situation.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
			situation.DateSuggestionResultCreated ? moment(situation.DateSuggestionResultCreated).format('YYYY-MM-DD HH:mm:ss') : null,
			situation.DateSuggestionResultProcessed ? moment(situation.DateSuggestionResultProcessed).format('YYYY-MM-DD HH:mm:ss') : null
		], (e: Error, res: any) => {
			if (e) {
				console.log(e);
				callback(e);
				return;
			}
			situation.Id = res.rows[0][Situation.COLUMN_SITUATION_ID];
			callback(null, situation);
		});
	}

	setSuggestionResultProcessed(situation: Situation, created: boolean, callback: (e: Error, situation?: Situation) => void) {
		situation.DateSuggestionResultProcessed = this.dateFactory.now();
		if (created) {
			situation.DateSuggestionResultCreated = this.dateFactory.now();
		}
		this.update(situation, callback);
	}

	setChecklistProcessed(situation: Situation, created: boolean, callback: (e: Error, situation?: Situation) => void) {
		situation.DateChecklistProcessed = this.dateFactory.now();
		if (created) {
			situation.DateChecklistCreated = this.dateFactory.now();
		}
		this.update(situation, callback);
	}

	update(situation: Situation, callback: (e: Error, situation?: Situation) => void) {
		this.connection.query('UPDATE ' + Situation.TABLE_NAME
			+ ' SET ' + Situation.COLUMN_DATE_CREATED + ' = $1::timestamp '
			+ ' , ' + Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED + ' = $2 '
			+ ' , ' + Situation.COLUMN_DATE_SUGGESTION_RESULT_PROCESSED + ' = $3 '
			+ ' , ' + Situation.COLUMN_DATE_CHECKLIST_CREATED + ' = $4 '
			+ ' , ' + Situation.COLUMN_DATE_CHECKLIST_PROCESSED + ' = $5 '
			+ ' WHERE ' + Situation.COLUMN_SITUATION_ID + ' = $6 ', [
			moment(situation.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
			situation.DateSuggestionResultCreated ? moment(situation.DateSuggestionResultCreated).format('YYYY-MM-DD HH:mm:ss') : null,
			situation.DateSuggestionResultProcessed ? moment(situation.DateSuggestionResultProcessed).format('YYYY-MM-DD HH:mm:ss') : null,
			situation.DateChecklistCreated ? moment(situation.DateChecklistCreated).format('YYYY-MM-DD HH:mm:ss') : null,
			situation.DateChecklistProcessed ? moment(situation.DateChecklistProcessed).format('YYYY-MM-DD HH:mm:ss') : null,
			situation.Id
		], (e: Error, res: any) => {
			if (e) {
				console.log(e);
				callback(e);
				return;
			}
			callback(null, situation);
		});
	}

	removeByIds(ids: number[], callback: (e: Error) => void) {
		var sql = 'DELETE FROM ' + Situation.TABLE_NAME + ' '
			+ ' WHERE ' + Situation.COLUMN_SITUATION_ID + ' IN ( ' + ids.join(', ') + ' ) ';
		this.connection.query(sql, [], (e: Error, result: any) => {
			callback(e);
		});
	}
}
