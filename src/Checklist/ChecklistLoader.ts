
import mongoose = require('mongoose');
import Checklist = require('../Entity/Checklist/Checklist');
import ChecklistFilter = require('../Entity/Checklist/ChecklistFilter');
import ChecklistModel = require('../Definition/Checklist/ChecklistModel');
import List = require('../Entity/List');
import DocumentExecutor = require('../Util/DocumentExecutor');
import IChecklistDocument = require('../Definition/Checklist/IChecklistDocument');

export = ChecklistLoader;
class ChecklistLoader {

	private model: mongoose.Model<IChecklistDocument>;
	private documentExecutor: DocumentExecutor;

	constructor() {
		this.model = ChecklistModel;
		this.documentExecutor = new DocumentExecutor(this.model, Checklist);
	}

	getById(eShopId: number, id: string, callback: (e: Error, entity?: Checklist) => void) {
		var conditions = {
			"eShopId": eShopId,
			"id": id
		};
		this.model.findOne(conditions, (e, object) => this.documentExecutor.createByObject(e, object, callback));
	}

	getList(eShopId: number, filter: ChecklistFilter, callback: (e: Error, ChecklistList?: List<Checklist>) => void) {
		var conditions = {};
		conditions['eShopId'] = eShopId;
		var sort = {};
		filter.OrderByDateCreated && (sort['dateCreated'] = filter.OrderByDateCreated);
		this.model.find(conditions).sort(sort).exec((e, objects) => this.documentExecutor.createListByObjects(e, objects, callback));
	}
}
