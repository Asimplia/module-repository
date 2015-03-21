
import IValueFailureObject = require('./IValueFailureObject');
import Util = require('asimplia-util');
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
/* tslint:disable */
Util;
/* tslint:enable */

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
		dataTypeFailedAt: { $type: new Type.Date(true, true), $name: 'datatypefailedat' },
		heurekaProductId: { $type: new Type.Integer(4, true), $name: 'heurekaid' },
		heurekaParamId: { $type: new Type.Integer(4, true), $name: 'paramid' },
		heurekaDeliveryId: { $type: new Type.Integer(4, true), $name: 'heurekadeliveryid' },
		heurekaAccessoryId: { $type: new Type.Integer(4, true), $name: 'accessoryid' },
		zboziProductId: { $type: new Type.Integer(4, true), $name: 'zboziid' }
	};

	get Id() { return this.object.id; }

	constructor(
		private object: IValueFailureObject
	) {}
}

