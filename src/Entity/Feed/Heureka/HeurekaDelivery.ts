
import IHeurekaDeliveryObject = require('./IHeurekaDeliveryObject');
import Util = require('asimplia-util');
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;

export = HeurekaDelivery;
class HeurekaDelivery {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.heureka_delivery',
		id: { $type: new Type.Id(new Type.Integer(4)), $name: 'heurekadeliveryid' },
		heurekaProductId: { $type: Type.Integer, $name: 'heurekaid' },
		feedLoadId: { $type: Type.Integer, $name: 'loadid' },
		heurekaProductExternalId: { $type: new Type.String(36), $name: 'item_id' },
		externalId: { $type: new Type.String(50), $name: 'deliveryid' },
		price: { $type: new Type.Float(4, true), $name: 'deliveryprice' },
		priceCod: { $type: new Type.Float(4, true), $name: 'deliverypricecod' }
	};

	get Id() { return this.object.id; }

	constructor(
		private object: IHeurekaDeliveryObject
	) {}
}
