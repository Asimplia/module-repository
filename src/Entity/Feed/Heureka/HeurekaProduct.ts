
import IHeurekaProductObject = require('./IHeurekaProductObject');
import Util = require('asimplia-util');
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;

export = HeurekaProduct;
class HeurekaProduct {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.heureka',
		id: { $type: new Type.Id(new Type.Integer(4)), $name: 'heurekaid' },
		feedLoadId: { $type: new Type.Integer, $name: 'loadid' },
		eShopId: { $type: new Type.Integer, $name: 'eshopid' },
		externalId: { $type: new Type.String(36, true), $name: 'item_id' },
		productName: { $type: new Type.String(255, true), $name: 'productname' },
		product: { $type: new Type.String(255, true), $name: 'product' },
		description: { $type: new Type.String(2048, true), $name: 'description' },
		url: { $type: new Type.String(2048, true), $name: 'url' },
		imageUrl: { $type: new Type.String(2048, true), $name: 'imgurl' },
		imageUrlAlternative: { $type: new Type.String(2048, true), $name: 'imgurl_alternative' },
		videoUrl: { $type: new Type.String(2048, true), $name: 'video_url' },
		priceVat: { $type: new Type.Float(4, true), $name: 'price_vat' },
		itemType: { $type: new Type.String(50, true), $name: 'item_type' },
		manufacturer: { $type: new Type.String(255, true), $name: 'manufacturer' },
		categoryText: { $type: new Type.String(255, true), $name: 'categorytext' },
		ean: { $type: new Type.String(13, true), $name: 'ean' },
		isbn: { $type: new Type.String(20, true), $name: 'isbn' },
		heurekaCpc: { $type: new Type.Float(4, true), $name: 'heureka_cpc' },
		deliveryDate: { $type: new Type.String(20, true), $name: 'delivery_date' },
		itemGroupId: { $type: new Type.String(36, true), $name: 'itemgroup_id' }
	};

	get Id() { return this.object.id; }
	get ExternalId() { return this.object.externalId; }

	constructor(
		private object: IHeurekaProductObject
	) {}
}
