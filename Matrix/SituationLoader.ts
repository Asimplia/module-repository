
import Repository = require('../index');
import Signal = require('../Entity/Matrix/Signal');
import Situation = require('../Entity/Matrix/Situation');
import Matrix = require('../Entity/Matrix/Matrix');
import List = require('../Entity/List');
import moment = require('moment');

export = SituationLoader;
class SituationLoader {

	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListNotSuggestedByEShopId(eShopId: number, callback: (e: Error, situationList?: List<Situation>) => void) {
		this.connection.query('SELECT * FROM analytical.'+Situation.TABLE_NAME
			+' JOIN analytical.'+Signal.TABLE_NAME+' USING ('+Signal.COLUMN_SITUATION_ID+') '
			+' JOIN analytical.'+Matrix.TABLE_NAME+' USING ('+Signal.COLUMN_MATRIX_ID+') '
			+' WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED+' IS NULL', [
			eShopId
		], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	getListByEShopIdAndLoadIdLimited(eShopId: number, loadId: number, limit: number, offset: number, callback: (e: Error, recordList?: List<Situation>) => void) {
		this.connection.query('SELECT * FROM analytical.'+Situation.TABLE_NAME
			+' JOIN analytical.'+Signal.TABLE_NAME+' USING ('+Signal.COLUMN_SITUATION_ID+') '
			+' JOIN analytical.'+Matrix.TABLE_NAME+' USING ('+Signal.COLUMN_MATRIX_ID+') '
			+' WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' LIMIT $3 OFFSET $4 ', [
			eShopId, loadId, limit, offset
		], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	private createListByResult(e: Error, result: any, callback: (e: Error, recordList?: List<Situation>) => void) {
		if (e) {
			callback(e);
			return;
		}
		var situationList = new List<Situation>();
		result.rows.forEach((row) => {
			var situation = situationList.find((situation: Situation) => {
				return situation.Id == row[Situation.COLUMN_SITUATION_ID];
			});
			if (!situation) {
				situation = new Situation(
					parseInt(row[Situation.COLUMN_SITUATION_ID]),
					new List<Signal>(),
					moment(row[Situation.COLUMN_DATE_CREATED]).toDate(),
					row[Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED] ? moment(row[Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED]).toDate() : null
				);
				situationList.push(situation);
			}
			var signal = Signal.fromRow(row);
			situation.SignalList.push(signal);
		});
		callback(null, situationList);
	}

}
