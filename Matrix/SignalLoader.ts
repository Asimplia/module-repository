
import moment = require('moment');
import AsimpliaRepository = require('../index');
import Signal = require('../Entity/Matrix/Signal');
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
		this.connection.query('SELECT * FROM Signal JOIN MatrixProduct USING (MatrixID) WHERE EShopID = ?', [
			eShopId
		], (e, recordset) => {
			if (e) {
				return callback(e);
			}
			var list = new List<Signal>();
			recordset.forEach((row) => {
				var signal = Signal.fromRow(row);
				list.push(signal);
			});
			callback(null, list);
		});
	}
}
