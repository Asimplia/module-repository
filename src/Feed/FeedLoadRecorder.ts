
import FeedLoad = require('../Entity/Feed/FeedLoad');
import IFeedLoadObject = require('../Entity/Feed/IFeedLoadObject');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = FeedLoadRecorder;
class FeedLoadRecorder {
	
	private manager: Manager<FeedLoad, IFeedLoadObject>;

	static $service = 'Feed.FeedLoadRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.manager = new Manager<FeedLoad, IFeedLoadObject>(FeedLoad, connection);
	}

	insert(feedLoad: FeedLoad, callback: (e: Error, feedLoad?: FeedLoad) => void) {
		this.manager.insert(feedLoad, callback);
	}
}
