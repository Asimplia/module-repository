
import mongoose = require('mongoose');
import Checklist = require('../Entity/Checklist/Checklist');
import List = require('../Entity/List');
import ChecklistModel = require('../Definition/Checklist/ChecklistModel');
import DocumentExecutor = require('../Util/DocumentExecutor');
import IChecklistDocument = require('../Definition/Checklist/IChecklistDocument');
import CheckItemList = require('../Entity/Checklist/CheckItemList');

export = ChecklistRecorder;
class ChecklistRecorder {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Checklist.ChecklistModel'
	];
	constructor(
		private model: mongoose.Model<IChecklistDocument>
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

	setCheckItemList(entity: Checklist, checkItemList: CheckItemList, callback: (e: Error, entity?: Checklist) => void) {
		entity.CheckItemList = checkItemList;
		this.documentExecutor.update(entity, callback);
	}
}
