
import Column = require('../../Entity/Feed/Check/Column');
import ColumnList = require('../../Entity/Feed/Check/ColumnList');
import ColumnEntityName = require('../../Entity/Feed/Check/ColumnEntityName');
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

	getListByEntity(entity: ColumnEntityName, callback: (e: Error, columnList?: ColumnList) => void) {
		throw new Error('Not implemented getListByEntity');
	}
}
