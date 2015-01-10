
import EntityPreparer = require('../Entity/EntityPreparer');
import List = require('../Entity/List');
import IEntity = require('../Entity/IEntity');
import ITableEntityStatic = require('../Entity/Common/ITableEntityStatic');
import _ = require('underscore');
import moment = require('moment');

export = SqlExecutor;
class SqlExecutor {

	constructor(
		private connection: any, 
		private EntityStatic: ITableEntityStatic, 
		private idColumnName: string,
		private idKeyName: string
	) {}
	
	insertList(list: List<IEntity>, callback: (e: Error, list?: List<IEntity>) => void) {
		if (list.isEmpty()) {
			callback(null, list);
			return;
		}
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

	getListBy(conditions: any, callback: (e: Error, list: List<IEntity>) => void) {
		var where = this.getWhereByConditions(conditions);
		var sql = 'SELECT ' + EntityPreparer.getColumnsAsPrefixedAlias(this.EntityStatic).join(', ') + ' '
			+ ' FROM ' + this.EntityStatic.TABLE_NAME + ' '
			+ ' WHERE ' + where.sql;
		this.connection.query(sql, where.params, (e: Error, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	removeBy(conditions: any, callback: (e: Error) => void) {
		var where = this.getWhereByConditions(conditions);
		var sql = 'DELETE FROM ' + this.EntityStatic.TABLE_NAME + ' '
			+ ' WHERE ' + where.sql;
		this.connection.query(sql, where.params, (e: Error) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null);
		});
	}

	private getWhereByConditions(conditions: any): { sql: string; params: any[] } {
		var params = [];
		var whereParts = [];
		var placeholderIndex = 0;
		_.each(Object.keys(conditions), (key: string) => {
			var value = conditions[key];
			var column = EntityPreparer.getTableColumnByKey(this.EntityStatic, key);
			if (typeof value === 'object') {
				if (typeof value.$gt !== 'undefined' && value.$gt !== null) {
					placeholderIndex++;
					whereParts.push(' ' + column + ' > $' + placeholderIndex) + ' ';
					params.push(this.prepareValue(value.$gt));
				}
				if (typeof value.$lt !== 'undefined' && value.$lt !== null) {
					placeholderIndex++;
					whereParts.push(' ' + column + ' < $' + placeholderIndex) + ' ';
					params.push(this.prepareValue(value.$lt));
				}
				if (typeof value.$gte !== 'undefined' && value.$gte !== null) {
					placeholderIndex++;
					whereParts.push(' ' + column + ' >= $' + placeholderIndex) + ' ';
					params.push(this.prepareValue(value.$gte));
				}
				if (typeof value.$lte !== 'undefined' && value.$lte !== null) {
					placeholderIndex++;
					whereParts.push(' ' + column + ' <= $' + placeholderIndex) + ' ';
					params.push(this.prepareValue(value.$lte));
				}
			} else {
				placeholderIndex++;
				whereParts.push(' ' + column + ' = $' + placeholderIndex) + ' ';
				params.push(this.prepareValue(value));
			}
		});
		return {
			sql: whereParts.length ? whereParts.join(' AND ') : 'TRUE',
			params: params
		};
	}

	createListByResult(e: Error, result: any, callback: (e: Error, list?: List<IEntity>) => void) {
		if (e) {
			callback(e);
			return;
		}
		var list = new List<any>();
		result.rows.forEach((row) => {
			var record = this.EntityStatic.fromRow(row);
			list.push(record);
		});
		callback(null, list);
	}

	private prepareValue(value: any) {
		if (value instanceof Date) {
			return EntityPreparer.formatDate(moment(value).toDate());
		}
		return value;
	}
}
