
import Column = require('../../Entity/Feed/Check/Column');
import ColumnList = require('../../Entity/Feed/Check/ColumnList');
import IColumnObject = require('../../Entity/Feed/Check/IColumnObject');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.PostgreSql.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = ColumnRecorder;
class ColumnRecorder {

	static $service = 'Feed.Check.ColumnRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager: Manager<Column, IColumnObject, ColumnList>
			= new Manager<Column, IColumnObject, ColumnList>(Column, ColumnList, connection)
	) {}

	insertList(columnList: ColumnList, callback: (e: Error, columnList?: ColumnList) => void) {
		this.manager.insertList(columnList, callback);
	}

	insert(column: Column, callback: (e: Error, column?: Column) => void) {
		this.manager.insert(column, callback);
	}
}
