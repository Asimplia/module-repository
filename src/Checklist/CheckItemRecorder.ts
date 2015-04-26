
import mongoose = require('mongoose');
import CheckItem = require('../Entity/Checklist/CheckItem');
import ICheckItemObject = require('../Entity/Checklist/ICheckItemObject');
import CheckItemList = require('../Entity/Checklist/CheckItemList');
import ValueTypeEnum = require('../Entity/Checklist/ValueTypeEnum');
import Util = require('asimplia-util');
import DateFactory = Util.DateTime.DateFactory;
import Manager = Util.ODBM.Repository.MongoDB.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = CheckItemRecorder;
class CheckItemRecorder {

	static $service = 'Checklist.CheckItemRecorder';
	static $inject = [
		'connection.mongoose',
		DateFactory,
	];
	constructor(
		private connection: mongoose.Mongoose,
		private dateFactory: DateFactory,
		private manager: Manager<CheckItem, ICheckItemObject, CheckItemList>
			= new Manager<CheckItem, ICheckItemObject, CheckItemList>(
				CheckItem, CheckItemList, connection
			)
	) {}

	insertOrUpdateList(
		checkItemList: CheckItemList,
		callback: (e: Error, checkItemList?: CheckItemList) => void
	) {
		this.manager.insertOrUpdateList(checkItemList, callback);
	}

	insertOrUpdate(
		checkItem: CheckItem, callback: (e: Error, checkItem?: CheckItem) => void
	) {
		this.manager.insertOrUpdate(checkItem, callback);
	}

	update(checkItem: CheckItem, callback: (e: Error, checkItem?: CheckItem) => void) {
		this.manager.update(checkItem, callback);
	}

	insert(checkItem: CheckItem, callback: (e: Error, checkItem?: CheckItem) => void) {
		this.manager.insert(checkItem, callback);
	}

	insertList(
		checkItemList: CheckItemList,
		callback: (e: Error, checkItemList?: CheckItemList) => void
	) {
		this.manager.insertList(checkItemList, callback);
	}

	checkItem(
		checkItem: CheckItem,
		valueType: ValueTypeEnum,
		callback: (e: Error, checkItem?: CheckItem) => void
	) {
		var value = checkItem.ValueList.getByType(valueType);
		if (!value) return callback(new Error('Value ' + valueType + ' not found'));
		value.DateChecked = this.dateFactory.now();
		this.update(checkItem, callback);
	}

	uncheckItem(
		checkItem: CheckItem,
		valueType: ValueTypeEnum,
		callback: (e: Error, checkItem?: CheckItem) => void
	) {
		var value = checkItem.ValueList.getByType(valueType);
		if (!value) return callback(new Error('Value ' + valueType + ' not found'));
		value.DateChecked = null;
		this.update(checkItem, callback);
	}
}
