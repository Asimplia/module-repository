
import AsimpliaRepository = require('../index');
import List = require('../Entity/List');
import Record = require('../Entity/Matrix/Record');
import MatrixProduct = require('../Entity/Matrix/MatrixProduct');

export = RecordLoader;
class RecordLoader {

	private connection;

	getListByEShopId(eShopId: number, callback: (e: Error, recordList?: List<Record>) => void) {
		AsimpliaRepository.mssqlConnection.query('SELECT * FROM MatrixProduct WHERE EShopID = ?', [eShopId], (e, recordset) => {
			if (e) {
				return callback(e);
			}
			var list = new List<Record>();
			recordset.forEach((row) => {
				var record = MatrixProduct.fromRow(row);
				list.push(record);
			});
			callback(null, list);
		});
	}
}
