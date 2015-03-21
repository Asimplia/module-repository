
import PageView = require('../../Entity/Site/PageView/PageView');
import PageViewList = require('../../Entity/Site/PageView/PageViewList');
import IPageViewObject = require('../../Entity/Site/PageView/IPageViewObject');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.PostgreSql.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = PageViewLoader;
class PageViewLoader {

	static $service = 'Site.PageView.PageViewLoader';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager: Manager<PageView, IPageViewObject, PageViewList>
			= new Manager<PageView, IPageViewObject, PageViewList>(PageView, PageViewList, connection)
	) {}

	getById(id: number, callback: (e: Error, pageView?: PageView) => void) {
		var conditions = {
			id: id
		};
		this.manager.fetchBy(conditions, callback);
	}
}
