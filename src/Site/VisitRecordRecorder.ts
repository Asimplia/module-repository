
import Repository = require('asimplia-repository');
import VisitRecord = require('../Entity/Site/VisitRecord');
import EntityPreparer = require('../Entity/EntityPreparer');
import List = require('../Entity/List')

export = VisitRecordRecorder;
class VisitRecordRecorder {

	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}
	
	insertList(list: List<VisitRecord>, callback: (e: Error, list: List<VisitRecord>) => void) {
		var params = [];
		var placeholders = [];
		var placeholderIndex = 0;
		list.forEach((visitRecord: VisitRecord) => {
			var object = visitRecord.toObject();
			_.each(Object.keys(object), (key: string) => {
				var value = object[key];
				placeholderIndex++;
				params.push(value);
				placeholders.push('$' + placeholderIndex);
			});
		});
		var sql = "INSERT INTO " + VisitRecord.TABLE_NAME + ' (' + EntityPreparer.getTableColumns(VisitRecord) + ') VALUES (' + placeholders + ')';
		this.connection.query(sql, params, (e: Error, result) => {
			console.log(result);
		});
	}
}
