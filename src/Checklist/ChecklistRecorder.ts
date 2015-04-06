
import mongoose = require('mongoose');
import Checklist = require('../Entity/Checklist/Checklist');
import CheckItem = require('../Entity/Checklist/CheckItem');
import IChecklistObject = require('../Entity/Checklist/IChecklistObject');
import ChecklistList = require('../Entity/Checklist/ChecklistList');
import CheckItemList = require('../Entity/Checklist/CheckItemList');
import ValueTypeEnum = require('../Entity/Checklist/ValueTypeEnum');
import ICheckItemId = require('../Entity/Checklist/ICheckItemId');
import LocalizedString = require('../Entity/Locale/LocalizedString');
import SectionEnum = require('../Entity/Section/SectionEnum');
import Util = require('asimplia-util');
import DateFactory = Util.DateTime.DateFactory;
import Manager = Util.ODBM.Repository.MongoDB.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = ChecklistRecorder;
class ChecklistRecorder {

	static $inject = [
		'connection.mongoose',
		DateFactory,
	];
	constructor(
		private connection: mongoose.Mongoose,
		private dateFactory: DateFactory,
		private manager: Manager<Checklist, IChecklistObject, ChecklistList>
			= new Manager<Checklist, IChecklistObject, ChecklistList>(
				Checklist, ChecklistList, connection
			)
	) {}

	insertOrUpdateList(
		checklistList: ChecklistList,
		callback: (e: Error, checklistList?: ChecklistList) => void
	) {
		this.manager.insertOrUpdateList(checklistList, callback);
	}

	insertOrUpdate(
		checklist: Checklist, callback: (e: Error, checklist?: Checklist) => void
	) {
		this.manager.insertOrUpdate(checklist, callback);
	}

	update(checklist: Checklist, callback: (e: Error, checklist?: Checklist) => void) {
		this.manager.update(checklist, callback);
	}

	insert(checklist: Checklist, callback: (e: Error, checklist?: Checklist) => void) {
		this.manager.insert(checklist, callback);
	}

	createProductChecklist(
		eShopId: number, name: LocalizedString, checkItemList: CheckItemList, callback: (e: Error, entity?: Checklist) => void
	) {
		var checklist = Checklist.fromObject({
			id: null,
			eShopId: eShopId,
			dateCreated: this.dateFactory.now(),
			section: SectionEnum[SectionEnum.PRODUCT],
			name: name.toObject(),
			checkItems: checkItemList.toArray(CheckItem.toObject),
			dateResolved: null
		});
		this.insert(checklist, callback);
	}

	setCheckItemList(entity: Checklist, checkItemList: CheckItemList, callback: (e: Error, entity?: Checklist) => void) {
		entity.CheckItemList = checkItemList;
		this.update(entity, callback);
	}

	checkItem(
		checklist: Checklist,
		checkItemId: ICheckItemId,
		valueType: ValueTypeEnum,
		callback: (e: Error, checklist?: Checklist) => void
	) {
		var checkItem = checklist.CheckItemList.getById(checkItemId);
		if (!checkItem) return callback(new Error('CheckItem ' + checkItemId + ' not found'));
		var value = checkItem.ValueList.getByType(valueType);
		if (!value) return callback(new Error('Value ' + valueType + ' not found'));
		value.DateChecked = this.dateFactory.now();
		this.update(checklist, callback);
	}

	uncheckItem(
		checklist: Checklist,
		checkItemId: ICheckItemId,
		valueType: ValueTypeEnum,
		callback: (e: Error, checklist?: Checklist) => void
	) {
		var checkItem = checklist.CheckItemList.getById(checkItemId);
		if (!checkItem) return callback(new Error('CheckItem ' + checkItemId + ' not found'));
		var value = checkItem.ValueList.getByType(valueType);
		if (!value) return callback(new Error('Value ' + valueType + ' not found'));
		value.DateChecked = null;
		this.update(checklist, callback);
	}
}
