
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
		this.connection.query('INSERT INTO analytical.'+Situation.TABLE_NAME+' ('+Situation.COLUMN_DATE_CREATED+', '+Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED+')'
			+' VALUES ($1::timestamp, $2) RETURNING '+Situation.COLUMN_SITUATION_ID, [
			moment(situation.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
			situation.DateSuggestionResultCreated ? moment(situation.DateSuggestionResultCreated).format('YYYY-MM-DD HH:mm:ss') : null
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
		this.connection.query('UPDATE analytical.'+Situation.TABLE_NAME
			+' SET '+Situation.COLUMN_DATE_CREATED+' = $1::timestamp '
			+' , '+Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED+' = $2 '
			+' WHERE '+Situation.COLUMN_SITUATION_ID+' = $3 ', [
			moment(situation.DateCreated).format('YYYY-MM-DD HH:mm:ss'),
			situation.DateSuggestionResultCreated ? moment(situation.DateSuggestionResultCreated).format('YYYY-MM-DD HH:mm:ss') : null,
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

	removeByEShopIdAndLoadId(eShopId: number, loadId: number, callback: (e: Error) => void) {
		var sql = 'DELETE FROM analytical.'+Situation.TABLE_NAME+' '
			+' USING analytical.'+Signal.TABLE_NAME+' '
			+' , analytical.'+Matrix.TABLE_NAME+' '
			+' WHERE analytical.'+Signal.TABLE_NAME+'.'+Signal.COLUMN_SITUATION_ID+' = analytical.'+Situation.TABLE_NAME+'.'+Situation.COLUMN_SITUATION_ID+' '
			+' AND analytical.'+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_MATRIX_ID+' = analytical.'+Signal.TABLE_NAME+'.'+Signal.COLUMN_MATRIX_ID+' '
			+' AND '+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.COLUMN_LOAD_ID+' = $2 ';
		this.connection.query(sql, [
			eShopId, loadId
		], (e, result) => {
			callback(e);
		});
	}
}
