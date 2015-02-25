
import FeedLoad = require('../Entity/Feed/FeedLoad');
import IFeedLoadObject = require('../Entity/Feed/IFeedLoadObject');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.PostgreSql.Manager;
import List = Util.ODBM.Entity.List;

export = FeedLoadRecorder;
class FeedLoadRecorder {

	static $service = 'Feed.FeedLoadRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager = new Manager<FeedLoad, IFeedLoadObject, List<FeedLoad>>(FeedLoad, List, connection)
	) {}

	insert(feedLoad: FeedLoad, callback: (e: Error, feedLoad?: FeedLoad) => void) {
		this.manager.insert(feedLoad, callback);
	}
}
