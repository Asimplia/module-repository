
import FeedLoad = require('../Entity/Feed/FeedLoad');
import SqlExecutor = require('../Util/SqlExecutor');

export = FeedLoadRecorder;
class FeedLoadRecorder {
	
	private sqlExecutor: SqlExecutor;

	static $service = 'Feed.FeedLoadRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, FeedLoad, FeedLoad.COLUMN_FEED_LOAD_ID, 'id');
	}

	insert(feedLoad: FeedLoad, callback: (e: Error, feedLoad?: FeedLoad) => void) {
		this.sqlExecutor.insert(feedLoad, callback);
	}
}
