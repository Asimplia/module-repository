
import mongoose = require('mongoose');
import Checklist = require('../Entity/Checklist/Checklist');
import List = require('../Entity/List');
import DocumentExecutor = require('../Util/DocumentExecutor');
import IChecklistDocument = require('../Definition/Checklist/IChecklistDocument');
import CheckItemList = require('../Entity/Checklist/CheckItemList');
import LocalizedString = require('../Entity/Locale/LocalizedString');
import Util = require('asimplia-util');
import DateFactory = Util.DateTime.DateFactory;
import Image = require('../Entity/Image/Image');
import SectionEnum = require('../Entity/Section/SectionEnum');
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

	insertOrUpdateList(list: List<Checklist>, callback: (e: Error, list?: List<Checklist>) => void) {
		this.documentExecutor.insertOrUpdateList(list, callback);
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
}
