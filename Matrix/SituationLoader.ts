
import Repository = require('../index');
import Signal = require('../Entity/Matrix/Signal');
import Situation = require('../Entity/Matrix/Situation');
import Matrix = require('../Entity/Matrix/Matrix');
import List = require('../Entity/List');

export = SituationLoader;
class SituationLoader {

	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListByEShopId(eShopId: number, callback: (e: Error, situationList?: List<Situation>) => void) {
		this.connection.query('SELECT * FROM analytical.'+Situation.TABLE_NAME
			+' JOIN analytical.'+Signal.TABLE_NAME+' USING ('+Signal.COLUMN_SITUATION_ID+') '
			+' JOIN analytical.'+Matrix.TABLE_NAME+' USING ('+Signal.COLUMN_MATRIX_ID+') '
			+' WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1', [
			eShopId
		], (e, result) => {
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
						row[Situation.COLUMN_SITUATION_ID],
						new List<Signal>(),
						row[Situation.COLUMN_DATE_CREATED]
					);
					situationList.push(situation);
				}
				var signal = Signal.fromRow(row);
				situation.SignalList.push(signal);
			});
			callback(null, situationList);
		});
	}

}
