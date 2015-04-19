
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');
import CheckItemList = require('./CheckItemList');
import CheckItem = require('./CheckItem');
import IChecklistObject = require('./IChecklistObject');
import LocalizedString = require('../Locale/LocalizedString');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
/* tslint:disable */
Util;
/* tslint:enable */

export = Checklist;
class Checklist {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		id: new Type.Id(Type.String),
		eShopId: Type.Integer,
		dateCreated: Type.Date,
		section: Type.String,
		name: {
			cs: new Type.String(2048),
			en: new Type.String(2048)
		},
		checkItems: new Type.Array(CheckItem.$entity),
		dateResolved: new Type.Date(true, true)
	};
	private static converter = new Converter<Checklist, IChecklistObject>(Checklist);

	get Id() { return this.object.id; }
	get Section() { return SectionEnum[this.object.section]; }
	get Name() { return new LocalizedString(this.object.name); }
	get CheckItemList() { return Checklist.converter.getList<CheckItemList, CheckItem>(CheckItemList, CheckItem, this.object.checkItems); }
	get DateCreated() { return this.object.dateCreated; }
	get TotalCount() { return this.CheckItemList.count(); } // TODO total count should be whole products, not only checkItems

	set CheckItemList(itemList: CheckItemList) { this.object.checkItems = itemList ? itemList.toArray(CheckItem.toObject) : null; }

	constructor(
		private object: IChecklistObject
	) {}

	getSectionName() {
		return SectionFactory.getLabel(this.Section);
	}

	getDoneIndex() {
		return Math.round(this.CheckItemList.getCountDone() / this.CheckItemList.count());
	}

	static fromObject(object: IChecklistObject) {
		return Checklist.converter.fromObject(object);
	}

	static toObject(entity: Checklist): IChecklistObject {
		return Checklist.converter.toObject(entity);
	}

	toObject() {
		return Checklist.toObject(this);
	}
}
