
import ValueFailure = require('../../Entity/Feed/Failure/ValueFailure');
import IValueFailureObject = require('../../Entity/Feed/Failure/IValueFailureObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;

export = ValueFailureRecorder;
class ValueFailureRecorder {
	
	static $service = 'Feed.Failure.ValueFailureRecorder';
	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any,
		private manager = new Manager<ValueFailure, IValueFailureObject, List<ValueFailure>>(ValueFailure, List, connection)
	) {}

	insertList(valueFailureList: List<ValueFailure>, callback: (e: Error, valueFailureList?: List<ValueFailure>) => void) {
		this.manager.insertList(valueFailureList, callback);
	}

	insert(valueFailure: ValueFailure, callback: (e: Error, valueFailure?: ValueFailure) => void) {
		this.manager.insert(valueFailure, callback);
	}
}
