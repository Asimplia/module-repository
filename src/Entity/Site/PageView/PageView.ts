
import IPageViewObject = require('./IPageViewObject');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;

export = PageView;
class PageView {
	
	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.ga_pageview',
		id: { $name: 'turnoutid', $type: new Type.Id(new Type.Integer(4)) },
		feedLoadId: { $name: 'loadid', $type: new Type.Integer(4) },
		eShopId: { $name: 'eshopid', $type: new Type.Integer() },
		pagePath: { $name: 'pagepath', $type: new Type.String(2048, true) },
		pageViews: { $name: 'pageviews', $type: new Type.Integer(8, true) },
		entrances: { $name: 'entrances', $type: new Type.Integer(8, true) }
	};
	
	get Id() { return this.object.id; }

	constructor(private object: IPageViewObject) {}
}
