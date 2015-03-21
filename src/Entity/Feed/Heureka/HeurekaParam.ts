
import IHeurekaParamObject = require('./IHeurekaParamObject');
import Util = require('asimplia-util');
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
/* tslint:disable */
Util;
/* tslint:enable */

export = HeurekaParam;
class HeurekaParam {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.heurekaparam',
		id: { $type: new Type.Id(new Type.Integer(4)), $name: 'paramid' },
		heurekaProductId: { $type: Type.Integer, $name: 'heurekaid' },
		feedLoadId: { $type: Type.Integer, $name: 'loadid' },
		heurekaProductExternalId: { $type: new Type.String(36), $name: 'item_id' },
		name: { $type: new Type.String(50, true), $name: 'paramname' },
		value: { $type: new Type.String(50, true), $name: 'value' }
	};

	get Id() { return this.object.id; }

	constructor(
		private object: IHeurekaParamObject
	) {}
}
