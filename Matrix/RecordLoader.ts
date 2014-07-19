
import AsimpliaRepository = require('../index');
import List = require('../Entity/List');
import Record = require('../Entity/Matrix/Record');
import MatrixProduct = require('../Entity/Matrix/MatrixProduct');

export = RecordLoader;
class RecordLoader {

	private connection;

	constructor() {
		AsimpliaRepository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListByEShopId(eShopId: number, callback: (e: Error, recordList?: List<Record>) => void) {
		this.connection.query('SELECT * FROM analytical.matrix WHERE eshopid = $1', [eShopId], (e, result) => {
				if (e) {
					return callback(e);
				}
				var list = new List<Record>();
				result.rows.forEach((row) => {
					var record = MatrixProduct.fromRow(row);
					list.push(record);
				});
				callback(null, list);
		});
	}
}
