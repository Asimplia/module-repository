
import IColumnObject = require('./IColumnObject');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
import DataType = require('./DataType');
import ColumnEntityName = require('./ColumnEntityName');
/* tslint:disable */
Util;
/* tslint:enable */

export = Column;
class Column {

	get Id() { return this.object.id; }
	get DataType(): DataType { return DataType[this.object.dataType]; }
	get Entity(): ColumnEntityName { return ColumnEntityName[this.object.entity]; }
	get MaxLength() { return this.object.maxLength; }
	get Property() { return this.object.property; }

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.feedcolumn',
		id: { $name: 'feedcolumnid', $type: new Type.Id(new Type.Integer(4)) },
		feedCode: { $name: 'feedcode', $type: new Type.String(25) },
		entity: { $name: 'entity', $type: new Type.String(50) },
		property: { $name: 'property', $type: new Type.String(50) },
		dataType: { $name: 'datatype', $type: new Type.String(25) },
		maxLength: { $name: 'maxlength', $type: new Type.Integer(4, true) }
	};

	constructor(private object: IColumnObject) {}

}
