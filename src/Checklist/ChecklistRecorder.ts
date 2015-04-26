
import mongoose = require('mongoose');
import Checklist = require('../Entity/Checklist/Checklist');
import IChecklistObject = require('../Entity/Checklist/IChecklistObject');
import ChecklistList = require('../Entity/Checklist/ChecklistList');
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
		eShopId: number, name: LocalizedString, callback: (e: Error, entity?: Checklist) => void
	) {
		var checklist = Checklist.fromObject({
			id: null,
			eShopId: eShopId,
			dateCreated: this.dateFactory.now(),
			section: SectionEnum[SectionEnum.PRODUCT],
			name: name.toObject(),
			dateResolved: null
		});
		this.insert(checklist, callback);
	}
}
