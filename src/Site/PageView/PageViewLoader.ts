
import PageView = require('../../Entity/Site/PageView/PageView');
import PageViewList = require('../../Entity/Site/PageView/PageViewList');
import IPageViewObject = require('../../Entity/Site/PageView/IPageViewObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = PageViewLoader;
class PageViewLoader {
	
	static $service = 'Site.PageView.PageViewLoader';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager = new Manager<PageView, IPageViewObject, PageViewList>(PageView, PageViewList, connection)
	) {}

	getById(id: number, callback: (e: Error, pageView?: PageView) => void) {
		var conditions = {
			id: id
		};
		this.manager.fetchBy(conditions, callback);
	}
}
