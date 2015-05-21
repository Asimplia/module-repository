
import _ = require('underscore');
import ICheckItemObject = require('./ICheckItemObject');
import ValueList = require('./ValueList');
import Checklist = require('./Checklist');
import Value = require('./Value');
import LocalizedString = require('../Locale/LocalizedString');
import ISituationPrimary = require('./ISituationPrimary');
import Image = require('../Image/Image');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
/* tslint:disable */
Util;
/* tslint:enable */

export = CheckItem;
class CheckItem {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		id: new Type.Id(Type.String),
		label: {
			cs: new Type.String(2048, true),
			en: new Type.String(2048, true)
		},
		values: new Type.Array(Value.$entity),
		rank: new Type.Float(4, true),
		checklistId: Type.String,
		situationPrimary: {
			eShopId: Type.Integer,
			loadId: Type.Integer,
			productId: Type.Integer
		},
		image: _.extend({ $nullable: true }, Image.$entity)
	};
	private static converter = new Converter<CheckItem, ICheckItemObject>(CheckItem);

	get Id() { return this.object.id; }
	get SituationPrimary() { return this.object.situationPrimary; }
	get Label() { return new LocalizedString(this.object.label); }
	get ValueList() { return CheckItem.converter.getList<ValueList, Value>(ValueList, Value, this.object.values); }
	get ChecklistId() { return this.object.checklistId; }
	get Image() { return this.object.image ? Image.fromObject(this.object.image) : null; }

	set ValueList(valueList: ValueList) { this.object.values = valueList.toArray(Value.toObject); }
	set Checklist(checklist: Checklist) { this.object.checklistId = checklist.Id; }
	set Rank(rank: number) { this.object.rank = rank; }

	constructor(
		private object: ICheckItemObject
	) {}

	isChecked() {
		return this.ValueList.areAllChecked();
	}

	isDone() {
		return this.ValueList.areAllDone();
	}

	isSituationPrimaryEqual(situationPrimary: ISituationPrimary) {
		return situationPrimary.eShopId == this.SituationPrimary.eShopId
			&& situationPrimary.loadId == this.SituationPrimary.loadId
			&& situationPrimary.productId == this.SituationPrimary.productId;
	}

	static fromObject(object: ICheckItemObject) {
		return CheckItem.converter.fromObject(object);
	}

	static toObject(entity: CheckItem): ICheckItemObject {
		return CheckItem.converter.toObject(entity);
	}

	toObject() {
		return CheckItem.toObject(this);
	}
}
