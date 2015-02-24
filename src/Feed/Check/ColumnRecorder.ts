
import Column = require('../../Entity/Feed/Check/Column');
import IColumnObject = require('../../Entity/Feed/Check/IColumnObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = ColumnRecorder;
class ColumnRecorder {
	
	private manager: Manager<Column, IColumnObject>;

	static $service = 'Feed.Check.ColumnRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.manager = new Manager<Column, IColumnObject>(Column, connection);
	}

	insertList(columnList: List<Column>, callback: (e: Error, columnList?: List<Column>) => void) {
		this.manager.insertList(columnList, callback);
	}

	insert(column: Column, callback: (e: Error, column?: Column) => void) {
		this.manager.insert(column, callback);
	}
}
