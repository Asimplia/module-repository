
import mongoose = require('mongoose');
import Checklist = require('../Entity/Checklist/Checklist');
import ChecklistList = require('../Entity/Checklist/ChecklistList');
import DocumentExecutor = require('../Util/DocumentExecutor');
import IChecklistDocument = require('../Definition/Checklist/IChecklistDocument');
import CheckItemList = require('../Entity/Checklist/CheckItemList');
import ValueTypeEnum = require('../Entity/Checklist/ValueTypeEnum');
import ICheckItemId = require('../Entity/Checklist/ICheckItemId');
import LocalizedString = require('../Entity/Locale/LocalizedString');
import Util = require('asimplia-util');
import DateFactory = Util.DateTime.DateFactory;
import Image = require('../Entity/Image/Image');
import SectionEnum = require('../Entity/Section/SectionEnum');
import List = require('../Entity/List');
/* tslint:disable */
Util;
/* tslint:enable */

export = ChecklistRecorder;
class ChecklistRecorder {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Checklist.ChecklistModel',
		DateFactory,
	];
	constructor(
		private model: mongoose.Model<IChecklistDocument>,
		private dateFactory: DateFactory
	) {
		this.documentExecutor = new DocumentExecutor(this.model, Checklist);
	}

	insertOrUpdateList(list: ChecklistList, callback: (e: Error, list?: ChecklistList) => void) {
		this.documentExecutor.insertOrUpdateList(new List<Checklist>(list.toArray()), (e: Error, list: List<Checklist>)
			=> callback(e, new ChecklistList(list.toArray())));
	}

	insertOrUpdate(entity: Checklist, callback: (e: Error, entity?: Checklist) => void) {
		this.documentExecutor.insertOrUpdate(entity, callback);
	}

	insert(entity: Checklist, callback: (e: Error, entity?: Checklist) => void) {
		this.documentExecutor.insert(entity, callback);
	}

	createProductChecklist(
		eShopId: number, name: LocalizedString, checkItemList: CheckItemList, callback: (e: Error, entity?: Checklist) => void
	) {
		var checklist = new Checklist(
			null,
			eShopId,
			this.dateFactory.now(),
			SectionEnum.PRODUCT,
			name,
			checkItemList,
			new Image('1'), // TODO
			null
		);
		this.insert(checklist, callback);
	}

	setCheckItemList(entity: Checklist, checkItemList: CheckItemList, callback: (e: Error, entity?: Checklist) => void) {
		entity.CheckItemList = checkItemList;
		this.documentExecutor.update(entity, callback);
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
		this.insertOrUpdate(checklist, callback);
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
		this.insertOrUpdate(checklist, callback);
	}
}
