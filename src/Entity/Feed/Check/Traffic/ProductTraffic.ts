
import IProductTrafficObject = require('./IProductTrafficObject');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;

export = ProductTraffic;
class ProductTraffic {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.tmp_kontrola_navstevnosti',
		eShopId: { $name: 'eshopid', $type: new Type.Integer() },
		sitemapFeedLoadId: { $name: 'loadid_sitemap', $type: new Type.Integer() },
		pageViewFeedLoadId: { $name: 'loadid_ga', $type: new Type.Integer(4) },
		urn: { $name: 'uri', $type: new Type.String(2048) },
		pageViews: { $name: 'pageviews', $type: new Type.Integer() },
		entrances: { $name: 'entrances', $type: new Type.Integer() },
		checkScore: { $name: 'check_score', $type: new Type.Integer(4) },
		checkLabel: { $name: 'check_label', $type: new Type.String(Infinity) },
		checkDescription: { $name: 'check_description', $type: new Type.String(Infinity) }
	};
	
	constructor(private object: IProductTrafficObject) {}
}
