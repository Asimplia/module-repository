
import Q = require('q');
import Util = require('asimplia-util');
import LoadLog = require('../Entity/Load/LoadLog');
import LoadLogList = require('../Entity/Load/LoadLogList');
import SqlExecutor = require('../Util/SqlExecutor');
import DateFactory = Util.DateTime.DateFactory;
/* tslint:disable */
Util;
/* tslint:enable */

export = LoadLogRecorder;
class LoadLogRecorder {

	private sqlExecutor: SqlExecutor;

	static $service = 'Load.LoadLogRecorder';
	static $inject = [
		'connection.postgres',
		DateFactory,
	];
	constructor(
		private connection: any,
		private dateFactory: DateFactory
	) {
		this.sqlExecutor = new SqlExecutor(connection, LoadLog, LoadLog.COLUMN_LOAD_LOG_ID, 'id');
	}

	markListChecklistProcessed(list: LoadLogList, callback?: (e: Error, list?: LoadLogList) => void) {
		var deferred = Q.defer();
		var i = 2;
		var idPlaceholders = list.map((loadLog: LoadLog) => '$' + (i++)).toArray();
		var loadLogIds = list.map((loadLog: LoadLog) => loadLog.Id).toArray();
		this.connection.query(
			'UPDATE ' + LoadLog.TABLE_NAME + ' '
			+ ' SET ' + LoadLog.COLUMN_CHECKLIST_PROCESSED_AT + ' = $1 '
			+ ' WHERE ' + LoadLog.TABLE_NAME + '.' + LoadLog.COLUMN_LOAD_LOG_ID + ' IN (' + idPlaceholders.join(', ') + ')',
			[this.dateFactory.now()].concat(loadLogIds),
			(e: Error, result: any) => {
				if (e) return deferred.reject(e);
				deferred.resolve(list);
			});
		if (callback) {
			deferred.promise
			.then((list: LoadLogList) => callback(null, list), (e: Error) => callback(e));
		}
		return deferred.promise;
	}

	markListChecklistFailed(list: LoadLogList, callback?: (e: Error, list?: LoadLogList) => void) {
		var deferred = Q.defer();
		var i = 2;
		var idPlaceholders = list.map((loadLog: LoadLog) => '$' + (i++)).toArray();
		var loadLogIds = list.map((loadLog: LoadLog) => loadLog.Id).toArray();
		this.connection.query(
			'UPDATE ' + LoadLog.TABLE_NAME + ' '
			+ ' SET ' + LoadLog.COLUMN_CHECKLIST_FAILED_AT + ' = $1 '
			+ ' WHERE ' + LoadLog.TABLE_NAME + '.' + LoadLog.COLUMN_LOAD_LOG_ID + ' IN (' + idPlaceholders.join(', ') + ')',
			[this.dateFactory.now()].concat(loadLogIds),
			(e: Error, result: any) => {
				if (e) return deferred.reject(e);
				deferred.resolve(list);
			});
		if (callback) {
			deferred.promise
			.then((list: LoadLogList) => callback(null, list), (e: Error) => callback(e));
		}
		return deferred.promise;
	}
}
