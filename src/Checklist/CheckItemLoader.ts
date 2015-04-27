
import _ = require('underscore');
import mongoose = require('mongoose');
import CheckItemOrderBy = require('../Entity/Checklist/CheckItem/CheckItemOrderBy');
import CheckItem = require('../Entity/Checklist/CheckItem');
import ICheckItemObject = require('../Entity/Checklist/ICheckItemObject');
import CheckItemFilter = require('../Entity/Checklist/CheckItemFilter');
import CheckItemList = require('../Entity/Checklist/CheckItemList');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.MongoDB.Manager;
import Exception = Util.Error.Exception;
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

	getById(eShopId: number, checkItemId: string, callback: (e: Error, entity?: CheckItem) => void) {
		var conditions = {
			'situationPrimary.eShopId': eShopId,
			id: checkItemId
		};
		this.manager.Model.findOne(conditions, (e: Error, doc: mongoose.Document) => {
			if (e) return callback(e);
			if (!doc) return callback(null, null);
			callback(null, this.manager.Converter.fromRow(doc.toObject()));
		});
	}

	getList(eShopId: number, filter: CheckItemFilter, callback: (e: Error, checklistList?: CheckItemList) => void) {
		var conditions = {
			'situationPrimary.eShopId': eShopId
		};
		conditions = this.getConditionsByFilter(filter, conditions);
		var query = this.manager.Model.find(conditions);
		if (filter.Limit) {
			query.limit(filter.Limit);
		}
		if (filter.Offset) {
			query.skip(filter.Offset);
		}
		if (filter.OrderBy) {
			filter.OrderBy.forEach((orderBy: { type: CheckItemOrderBy; direction: number; }) => {
				var sortOption = {};
				sortOption[this.getOrderByKey(orderBy.type)] = orderBy.direction;
				query.sort(sortOption);
			});
		}
		query.exec((e: Error, docs: mongoose.Document[]) => {
			if (e) return callback(e);
			callback(null, this.manager.Converter.getList(
				CheckItemList,
				CheckItem,
				_.map(docs, (doc: mongoose.Document) => doc.toObject())
			));
		});
	}

	private getOrderByKey(type: CheckItemOrderBy) {
		switch (type) {
			case CheckItemOrderBy.ID: return 'id';
			case CheckItemOrderBy.VALUE_COUNT: return 'values.length';
			default: throw new Exception('Not implemented checkItem order by ' + CheckItemOrderBy[type]);
		}
	}

	private getConditionsByFilter(filter: CheckItemFilter, conditions: any = {}) {
		if (filter.ValueTypeGroupList) {
			conditions['values.valueType'] = {
				$in: filter.ValueTypeGroupList.getValueTypeList().getValueTypeEnumValues()
			};
		}
		if (filter.ChecklistId) {
			conditions.checklistId = filter.ChecklistId;
		}
		return conditions;
	}
}
