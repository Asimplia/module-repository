
import moment = require('moment');
import AsimpliaRepository = require('../index');
import Signal = require('../Entity/Matrix/Signal');
import Matrix = require('../Entity/Matrix/Matrix');
import List = require('../Entity/List');

export = SignalLoader;
class SignalLoader {

	private connection;

	constructor() {
		AsimpliaRepository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListByEShopId(eShopId: number, callback: (e: Error, signalList?: List<Signal>) => void) {
		this.connection.query('SELECT * FROM analytical.'+Signal.TABLE_NAME+' JOIN analytical.'+Matrix.TABLE_NAME+' USING ('+Signal.COLUMN_MATRIX_ID+') '
			+'WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1', [
			eShopId
		], (e, result) => {
			if (e) {
				callback(e);
				return;
			}
			var list = new List<Signal>();
			result.rows.forEach((row) => {
				var signal = Signal.fromRow(row);
				list.push(signal);
			});
			callback(null, list);
		});
	}

	getListWithoutSituation(eShopId: number, callback: (e: Error, signalList?: List<Signal>) => void) {
		this.connection.query('SELECT * FROM analytical.'+Signal.TABLE_NAME+' JOIN analytical.'+Matrix.TABLE_NAME+' USING ('+Signal.COLUMN_MATRIX_ID+') '
			+'WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1 AND '+Signal.COLUMN_SITUATION_ID+' IS NULL', [
			eShopId
		], (e, result) => {
			if (e) {
				console.log(e);
				callback(e);
				return;
			}
			var list = new List<Signal>();
			result.rows.forEach((row) => {
				var signal = Signal.fromRow(row);
				list.push(signal);
			});
			callback(null, list);
		});
	}
}
