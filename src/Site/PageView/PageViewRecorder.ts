
import PageView = require('../../Entity/Site/PageView/PageView');
import PageViewList = require('../../Entity/Site/PageView/PageViewList');
import IPageViewObject = require('../../Entity/Site/PageView/IPageViewObject');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.PostgreSql.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = PageViewRecorder;
class PageViewRecorder {

	static $service = 'Site.PageView.PageViewRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager: Manager<PageView, IPageViewObject, PageViewList>
			= new Manager<PageView, IPageViewObject, PageViewList>(PageView, PageViewList, connection)
	) {}

	insertList(pageViewList: PageViewList, callback: (e: Error, pageViewList?: PageViewList) => void) {
		this.manager.insertList(pageViewList, callback);
	}

	insert(pageView: PageView, callback: (e: Error, pageView?: PageView) => void) {
		this.manager.insert(pageView, callback);
	}

	removeByViewedAtBetween(eShopId: number, dateFrom: Date, dateTo: Date, callback: (e: Error) => void): void {
		var conditions = {
			eShopId: eShopId,
			viewedAt: {
				$gte: dateFrom,
				$lte: dateTo
			}
		};
		this.manager.removeBy(conditions, callback);
	}
}
