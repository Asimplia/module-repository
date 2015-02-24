
import IValueFailureObject = require('./IValueFailureObject');
import Util = require('asimplia-util');
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;

export = ValueFailure;
class ValueFailure {
	
	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.valuefailure',
		id: { $type: new Type.Id(new Type.Integer(4)), $name: 'valuefailureid' },
		feedLoadId: { $type: Type.Integer, $name: 'loadid' },
		columnId: { $type: Type.Integer, $name: 'feedcolumnid' },
		eShopId: { $type: Type.Integer, $name: 'eshopid' },
		formerValue: { $type: new Type.String(Infinity), $name: 'formervalue' },
		lengthFaliedAt: { $type: new Type.Date(true, true), $name: 'lengthfailedat' },
		dataTypeFailedAt: { $type: new Type.Date(true, true), $name: 'datatypefailedat' }
	};

	get Id() { return this.object.id; }

	constructor(
		private object: IValueFailureObject
	) {}
}

