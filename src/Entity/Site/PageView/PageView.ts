
import IPageViewObject = require('./IPageViewObject');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
/* tslint:disable */
Util;
/* tslint:enable */

export = PageView;
class PageView {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.POSTGRE_SQL,
		$name: 'feed.ga_pageview',
		id: { $name: 'turnoutid', $type: new Type.Id(new Type.Integer(4)) },
		feedLoadId: { $name: 'loadid', $type: new Type.Integer(4) },
		eShopId: { $name: 'eshopid', $type: new Type.Integer() },
		pagePath: { $name: 'pagepath', $type: new Type.String(4096, true) },
		pageViews: { $name: 'pageviews', $type: new Type.Integer(8, true) },
		entrances: { $name: 'entrances', $type: new Type.Integer(8, true) },
		viewedAt: { $name: 'viewedat', $type: new Type.Date() }
	};

	get Id() { return this.object.id; }

	constructor(private object: IPageViewObject) {}
}
