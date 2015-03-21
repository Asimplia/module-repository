
import IZboziProductObject = require('./IZboziProductObject');
import Util = require('asimplia-util');
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
/* tslint:disable */
Util;
/* tslint:enable */

export = ZboziProduct;
class ZboziProduct {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.zbozi',
		id: { $type: new Type.Id(new Type.Integer(4)), $name: 'zboziid' },
		feedLoadId: { $type: new Type.Integer, $name: 'loadid' },
		eShopId: { $type: new Type.Integer(8, true), $name: 'eshopid' },
		product: { $type: new Type.String(255, true), $name: 'product' },
		productName: { $type: new Type.String(255, true), $name: 'productname' },
		description: { $type: new Type.String(2048, true), $name: 'description' },
		url: { $type: new Type.String(2048, true), $name: 'url' },
		imageUrl: { $type: new Type.String(2048, true), $name: 'imgurl' },
		price: { $type: new Type.Float(4, true), $name: 'price' },
		vat: { $type: new Type.Float(4, true), $name: 'vat' },
		priceVat: { $type: new Type.Float(4, true), $name: 'price_vat' },
		maxCpc: { $type: new Type.Float(4, true), $name: 'max_cpc' },
		maxCpcSearch: { $type: new Type.Float(4, true), $name: 'max_cpc_search' },
		dues: { $type: new Type.Float(4, true), $name: 'dues' },
		deliveryDate: { $type: new Type.String(50, true), $name: 'delivery_date' },
		shopDepots: { $type: new Type.String(50, true), $name: 'shop_depots' },
		unfeatured: { $type: new Type.Boolean(true), $name: 'unfeatured' },
		itemType: { $type: new Type.String(50, true), $name: 'item_type' },
		extraMessage: { $type: new Type.String(50, true), $name: 'extra_message' },
		manufacturer: { $type: new Type.String(255, true), $name: 'manufacturer' },
		categoryText: { $type: new Type.String(255, true), $name: 'categorytext' },
		ean: { $type: new Type.String(14, true), $name: 'ean' },
		productNumber: { $type: new Type.String(50, true), $name: 'productno' },
		variantName: { $type: new Type.String(255, true), $name: 'productnameext' }
	};

	get Id() { return this.object.id; }

	constructor(
		private object: IZboziProductObject
	) {}
}
