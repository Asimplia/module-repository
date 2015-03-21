
import mongoose = require('mongoose');
import Checklist = require('../Entity/Checklist/Checklist');
import ChecklistFilter = require('../Entity/Checklist/ChecklistFilter');
import List = require('../Entity/List');
import DocumentExecutor = require('../Util/DocumentExecutor');
import IChecklistDocument = require('../Definition/Checklist/IChecklistDocument');

export = ChecklistLoader;
class ChecklistLoader {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Checklist.ChecklistModel'
	];
	constructor(
		private model: mongoose.Model<IChecklistDocument>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, Checklist);
	}

	getById(eShopId: number, id: string, callback: (e: Error, entity?: Checklist) => void) {
		var conditions = {
			eShopId: eShopId,
			id: id
		};
		this.model.findOne(conditions, (e: Error, object: any) => this.documentExecutor.createByObject(e, object, callback));
	}

	getList(eShopId: number, filter: ChecklistFilter, callback: (e: Error, ChecklistList?: List<Checklist>) => void) {
		var conditions: any = {};
		conditions.eShopId = eShopId;
		var sort: any = {};
		if (filter.OrderByDateCreated) sort.dateCreated = filter.OrderByDateCreated;
		this.model.find(conditions).sort(sort).exec((e: Error, objects: any[])
			=> this.documentExecutor.createListByObjects(e, objects, callback));
	}
}
