
import PageView = require('../../Entity/Site/PageView/PageView');
import PageViewList = require('../../Entity/Site/PageView/PageViewList');
import IPageViewObject = require('../../Entity/Site/PageView/IPageViewObject');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = PageViewRecorder;
class PageViewRecorder {
	
	static $service = 'Site.PageView.PageViewRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager = new Manager<PageView, IPageViewObject, PageViewList>(PageView, PageViewList, connection)
	) {}

	insertList(pageViewList: PageViewList, callback: (e: Error, pageViewList?: PageViewList) => void) {
		this.manager.insertList(pageViewList, callback);
	}

	insert(pageView: PageView, callback: (e: Error, pageView?: PageView) => void) {
		this.manager.insert(pageView, callback);
	}
}
