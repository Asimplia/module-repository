
import EntityPreparer = require('../Entity/EntityPreparer');
import List = require('../Entity/List');
import IEntity = require('../Entity/IEntity');
import _ = require('underscore');

export = SqlExecutor;
class SqlExecutor {

	constructor(
		private connection: any, 
		private EntityStatic: any, 
		private idColumnName: string,
		private idKeyName: string
	) {}
	
	insertList(list: List<IEntity>, callback: (e: Error, list?: List<IEntity>) => void) {
		var params = [];
		var placeholderRows = [];
		var placeholderIndex = 0;
		list.forEach((entity: IEntity) => {
			var placeholders = [];
			var object = entity.toObject();
			_.each(Object.keys(object), (key: string) => {
				if (key === this.idKeyName) {
					return;
				}
				var value = object[key];
				placeholderIndex++;
				params.push(value);
				placeholders.push('$' + placeholderIndex);
			});
			placeholderRows.push(placeholders.join(','));
		});
		var columns = EntityPreparer.getTablePlainColumns(this.EntityStatic);
		var noIdColumns = _.filter(columns, (column: string) => { 
			return column !== this.idColumnName; 
		});
		var sql = "INSERT INTO " + this.EntityStatic.TABLE_NAME + ' (' + noIdColumns + ') VALUES (' + placeholderRows.join('),(') + ')';
		this.connection.query(sql, params, (e: Error, result) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, list);
		});
	}	
}
