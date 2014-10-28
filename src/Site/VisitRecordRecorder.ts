
import Repository = require('../index');
import VisitRecord = require('../Entity/Site/VisitRecord');
import EntityPreparer = require('../Entity/EntityPreparer');
import List = require('../Entity/List');
import _ = require('underscore');

export = VisitRecordRecorder;
class VisitRecordRecorder {

	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}
	
	insertList(list: List<VisitRecord>, callback: (e: Error, list?: List<VisitRecord>) => void) {
		var params = [];
		var placeholderRows = [];
		var placeholderIndex = 0;
		list.forEach((visitRecord: VisitRecord) => {
			var placeholders = [];
			var object = visitRecord.toObject();
			_.each(Object.keys(object), (key: string) => {
				if (key === 'id') {
					return;
				}
				var value = object[key];
				placeholderIndex++;
				params.push(value);
				placeholders.push('$' + placeholderIndex);
			});
			placeholderRows.push(placeholders.join(','));
		});
		var columns = EntityPreparer.getTablePlainColumns(VisitRecord);
		var sql = "INSERT INTO " + VisitRecord.TABLE_NAME + ' (' + _.filter(columns, (column: string) => { return column !== VisitRecord.COLUMN_VISIT_RECORD_ID; }) + ') VALUES (' + placeholderRows.join('),(') + ')';
		this.connection.query(sql, params, (e: Error, result) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, list);
		});
	}
}
