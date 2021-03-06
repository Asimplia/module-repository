
import _ = require('underscore');
import mongoose = require('mongoose');
import Checklist = require('../Entity/Checklist/Checklist');
import IChecklistObject = require('../Entity/Checklist/IChecklistObject');
import ChecklistFilter = require('../Entity/Checklist/ChecklistFilter');
import ChecklistList = require('../Entity/Checklist/ChecklistList');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.MongoDB.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = ChecklistLoader;
class ChecklistLoader {

	static $inject = [
		'connection.mongoose',
	];
	constructor(
		private connection: mongoose.Mongoose,
		private manager: Manager<Checklist, IChecklistObject, ChecklistList>
			= new Manager<Checklist, IChecklistObject, ChecklistList>(
				Checklist, ChecklistList, connection
			)
	) {}

	getById(eShopId: number, id: string, callback: (e: Error, entity?: Checklist) => void) {
		var conditions = {
			eShopId: eShopId,
			id: id
		};
		this.manager.Model.findOne(conditions, (e: Error, doc: mongoose.Document) => {
			if (e) return callback(e);
			if (!doc) return callback(null, null);
			callback(null, this.manager.Converter.fromRow(doc.toObject()));
		});
	}

	getLast(eShopId: number, callback: (e: Error, entity?: Checklist) => void) {
		var conditions = {
			eShopId: eShopId
		};
		this.manager.Model.findOne(conditions)
		.sort({ dateCreated: -1 })
		.exec((e: Error, doc: mongoose.Document) => {
			if (e) return callback(e);
			if (!doc) return callback(null, null);
			callback(null, this.manager.Converter.fromRow(doc.toObject()));
		});
	}

	getList(eShopId: number, filter: ChecklistFilter, callback: (e: Error, checklistList?: ChecklistList) => void) {
		var conditions: any = {};
		conditions.eShopId = eShopId;
		var sort: any = {};
		if (filter.OrderByDateCreated) sort.dateCreated = filter.OrderByDateCreated;
		this.manager.Model.find(conditions)
		.sort(sort)
		.exec((e: Error, docs: mongoose.Document[]) => {
			if (e) return callback(e);
			callback(null, new ChecklistList(_.map(
				docs,
				(doc: mongoose.Document) => this.manager.Converter.fromRow(doc.toObject())
			)));
		});
	}
}
