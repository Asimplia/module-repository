
import Column = require('../../Entity/Feed/Check/Column');
import IColumnObject = require('../../Entity/Feed/Check/IColumnObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = ColumnLoader;
class ColumnLoader {
	
	private manager: Manager<Column, IColumnObject>;

	static $service = 'Feed.Check.ColumnLoader';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.manager = new Manager<Column, IColumnObject>(Column, connection);
	}

	
}
