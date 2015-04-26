
import _ = require('underscore');
import mongoose = require('mongoose');
import Checklist = require('../Entity/Checklist/Checklist');
import CheckItem = require('../Entity/Checklist/CheckItem');
import ICheckItemObject = require('../Entity/Checklist/ICheckItemObject');
import ISituationPrimary = require('../Entity/Checklist/ISituationPrimary');
import CheckItemFilter = require('../Entity/Checklist/CheckItemFilter');
import CheckItemList = require('../Entity/Checklist/CheckItemList');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.MongoDB.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = CheckItemLoader;
class CheckItemLoader {

	static $service = 'Checklist.CheckItemLoader';
	static $inject = [
		'connection.mongoose',
	];
	constructor(
		private connection: mongoose.Mongoose,
		private manager: Manager<CheckItem, ICheckItemObject, CheckItemList>
			= new Manager<CheckItem, ICheckItemObject, CheckItemList>(
				CheckItem, CheckItemList, connection
			)
	) {}

	getById(checklist: Checklist, situationPrimary: ISituationPrimary, callback: (e: Error, entity?: CheckItem) => void) {
		var conditions = {
			checklistId: checklist.Id,
			situationPrimary: situationPrimary
		};
		this.manager.Model.findOne(conditions, (e: Error, doc: mongoose.Document) => {
			if (e) return callback(e);
			if (!doc) return callback(null, null);
			callback(null, this.manager.Converter.fromRow(doc.toObject()));
		});
	}

	getList(checklist: Checklist, filter: CheckItemFilter, callback: (e: Error, checklistList?: CheckItemList) => void) {
		var conditions = {
			checklistId: checklist.Id
		};
		conditions = this.getConditionsByFilter(filter, conditions);
		this.manager.Model.find(conditions, (e: Error, docs: mongoose.Document[]) => {
			if (e) return callback(e);
			callback(null, this.manager.Converter.getList(
				CheckItemList,
				CheckItem,
				_.map(docs, (doc: mongoose.Document) => doc.toObject())
			));
		});
	}

	private getConditionsByFilter(filter: CheckItemFilter, conditions: any = {}) {
		if (filter.ValueTypeGroupList) {
			conditions['values.valueType'] = {
				$in: filter.ValueTypeGroupList.getValueTypeList().getValueTypeEnumValues()
			};
		}
		return conditions;
	}
}
