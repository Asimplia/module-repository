
import _ = require('underscore');
import ValueTypeGroupList = require('./ValueType/ValueTypeGroupList');
import ValueTypeGroup = require('./ValueType/ValueTypeGroup');
import ICheckItemFilterObject = require('./ICheckItemFilterObject');
import CheckItemOrderBy = require('./CheckItem/CheckItemOrderBy');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
/* tslint:disable */
Util;
/* tslint:enable */

export = CheckItemFilter;
class CheckItemFilter {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		eShopId: new Type.Integer(8, true),
		updatedAt: new Type.Date(true, true),
		categoryId: new Type.Integer(4, true),
		checklistId: new Type.String(50, true),
		valueTypeGroups: new Type.Array(ValueTypeGroup.$entity, true),
		orderBy: new Type.Array({
			type: Type.String,
			direction: Type.Integer
		}, true),
		limit: new Type.Integer(4, true),
		offset: new Type.Integer(4, true)
	};
	private static converter = new Converter<CheckItemFilter, ICheckItemFilterObject>(CheckItemFilter);

	get ValueTypeGroupList() {
		return CheckItemFilter.converter.getList<ValueTypeGroupList, ValueTypeGroup>(
			ValueTypeGroupList, ValueTypeGroup, this.object.valueTypeGroups
		);
	}
	get CategoryId() { return this.object.categoryId; }
	get ChecklistId() { return this.object.checklistId; }
	get Limit() { return this.object.limit; }
	get Offset() { return this.object.offset; }
	get OrderBy() {
		return _.map(this.object.orderBy, (orderBy: { type: string; direction: number; }) => {
			return {
				type: CheckItemOrderBy[orderBy.type],
				direction: orderBy.direction
			};
		});
	}

	set ValueTypeGroupList(list: ValueTypeGroupList) { this.object.valueTypeGroups = list ? list.toArray(ValueTypeGroup.toObject) : null; }
	set CategoryId(categoryId: number) { this.object.categoryId = categoryId; }
	set ChecklistId(checklistId: string) { this.object.checklistId = checklistId; }
	set Limit(limit: number) { this.object.limit = limit; }
	set Offset(offset: number) { this.object.offset = offset; }
	set OrderByValuesCount(direction: number) { this.addOrderBy(CheckItemOrderBy.VALUE_COUNT, direction); }
	set OrderById(direction: number) { this.addOrderBy(CheckItemOrderBy.ID, direction); }
	set OrderByRank(direction: number) { this.addOrderBy(CheckItemOrderBy.RANK, direction); }

	constructor(
		private object: ICheckItemFilterObject = {}
	) {}

	addValueTypeGroup(group: ValueTypeGroup) {
		if (!this.ValueTypeGroupList) {
			this.ValueTypeGroupList = new ValueTypeGroupList([]);
		}
		this.ValueTypeGroupList = new ValueTypeGroupList(this.ValueTypeGroupList.add(group).toArray());
		return this;
	}

	addOrderBy(type: CheckItemOrderBy, direction: number) {
		if (!this.object.orderBy) {
			this.object.orderBy = [];
		}
		this.object.orderBy.push({ type: CheckItemOrderBy[type], direction: direction });
	}

	removeValueTypeGroup(group: ValueTypeGroup) {
		var groupList = this.ValueTypeGroupList;
		if (groupList) {
			this.ValueTypeGroupList = new ValueTypeGroupList(
				groupList.remove(groupList.findByType(group.Type)).toArray()
			);
		}
		if (!this.ValueTypeGroupList || this.ValueTypeGroupList.isEmpty()) {
			this.ValueTypeGroupList = null;
		}
		return this;
	}

	toggleValueTypeGroup(group: ValueTypeGroup) {
		if (!this.ValueTypeGroupList || !this.ValueTypeGroupList.containsByType(group.Type)) {
			this.addValueTypeGroup(group);
		} else {
			this.removeValueTypeGroup(group);
		}
		return this;
	}

	toObject() {
		return CheckItemFilter.converter.toObject(this);
	}

	static fromObject(object: ICheckItemFilterObject) {
		return CheckItemFilter.converter.fromObject(object);
	}
}
