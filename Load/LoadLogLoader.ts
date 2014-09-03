
import Repository = require('../index');
import List = Repository.Entity.List;
import LoadLog = Repository.Entity.Load.LoadLog;
Repository;

export = LoadLogLoader;
class LoadLogLoader {
	
	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getList(callback: (e: Error, list: List<LoadLog>) => void) {
		this.connection.query(
			'SELECT * FROM warehouse.'+LoadLog.TABLE_NAME+' ', 
			[], 
			(e, result) => {
				this.createListByResult(e, result, callback);
			});
	}

	private createListByResult(e: Error, result: any, callback: (e: Error, list?: List<LoadLog>) => void) {
		if (e) {
			console.log(e);
			callback(e);
			return;
		}
		var list = new List<LoadLog>();
		result.rows.forEach((row) => {
			list.push(LoadLog.fromRow(row));
		});
		callback(null, list);
	}
}
