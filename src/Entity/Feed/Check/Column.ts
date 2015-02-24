
import IColumnObject = require('./IColumnObject');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;

export = Column;
class Column {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.feedcolumn',
		id: { $name: 'loadid', $type: new Type.Id(new Type.Integer(4)) },
		feedCode: { $name: 'feedcode', $type: new Type.String(25) },
		entity: { $name: 'entity', $type: new Type.String(50) },
		property: { $name: 'property', $type: new Type.String(50) },
		dataType: { $name: 'datatype', $type: new Type.String(25) },
		maxLength: { $name: 'maxlength', $type: new Type.Integer(4, true) }
	};
	
	get Id() { return this.object.id; }

	constructor(private object: IColumnObject) {}

}
