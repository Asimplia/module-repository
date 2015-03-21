
import Column = require('../../Entity/Feed/Check/Column');
import ColumnList = require('../../Entity/Feed/Check/ColumnList');
import ColumnEntityName = require('../../Entity/Feed/Check/ColumnEntityName');
import IColumnObject = require('../../Entity/Feed/Check/IColumnObject');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.PostgreSql.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = ColumnLoader;
class ColumnLoader {

	static $service = 'Feed.Check.ColumnLoader';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager: Manager<Column, IColumnObject, ColumnList>
			= new Manager<Column, IColumnObject, ColumnList>(Column, ColumnList, connection)
	) {}

	getListByEntity(entity: ColumnEntityName, callback: (e: Error, columnList?: ColumnList) => void) {
		var conditions = {
			entity: ColumnEntityName[entity]
		};
		this.manager.fetchListBy(conditions, callback);
	}
}
