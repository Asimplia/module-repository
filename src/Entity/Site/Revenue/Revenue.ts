
import IRevenueObject = require('./IRevenueObject');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;

export = Revenue;
class Revenue {
	
	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.ga_revenue',
		id: { $name: 'revenuesid', $type: new Type.Id(new Type.Integer(4)) },
		feedLoadId: { $name: 'loadid', $type: new Type.Integer(4) },
		eShopId: { $name: 'eshopid', $type: new Type.Integer() },
		productName: { $name: 'productname', $type: new Type.String(1000, true) },
		productSku: { $name: 'productsku', $type: new Type.String(100, true) },
		itemQuantity: { $name: 'itemquantity', $type: new Type.Integer(4, true) },
		itemRevenue: { $name: 'itemrevenue', $type: new Type.Float(4, true) }
	};
	
	get Id() { return this.object.id; }

	constructor(private object: IRevenueObject) {}
}
