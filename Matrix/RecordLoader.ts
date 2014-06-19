
import AsimpliaRepository = require('../index');
import List = require('../Entity/List');
import Record = require('../Entity/Matrix/Record');

export = RecordLoader;
class RecordLoader {

	private connection;

	getListByEShopId(eShopId: number, callback: (e: Error, recordList?: List<Record>) => void) {
		AsimpliaRepository.mssqlConnection.query("SELECT * FROM CMatrix", (e, recordset) => {
			if (e) {
				console.error(e);
				return callback(e);
			}
			console.dir(recordset);
		});
	}
}
