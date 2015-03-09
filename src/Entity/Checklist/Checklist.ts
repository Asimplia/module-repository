
import _ = require('underscore');
import IEntity = require('../IEntity');
import IHashIdentificableEntity = require('../Common/IHashIdentificableEntity');
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');
import LocalizedString = require('../Locale/LocalizedString');
import CheckItemList = require("./CheckItemList");
import CheckItem = require("./CheckItem");
import Image = require("../Image/Image");
import IChecklistObject = require('./IChecklistObject');
import EntityPreparer = require('../EntityPreparer');

export = Checklist;
class Checklist implements IHashIdentificableEntity {

	get Id() { return this.id; }
	get Section() { return this.section; }
	get Name() { return this.name; }
	get CheckItemList() { return this.checkItemList; }

	constructor(
		private id: string,
		private eShopId: number,
		private dateCreated: Date,
		private section: SectionEnum,
		private name: LocalizedString,
		private checkItemList: CheckItemList,
		private mainImage: Image, // TODO move to checkItem
		private dateResolved: Date
	) {}

	getSectionName() {
		return SectionFactory.getLabel(this.section);
	}

	static fromObject(object: IChecklistObject) {
		return new Checklist(
			EntityPreparer.id(object.id),
			EntityPreparer.int(object.eShopId),
			EntityPreparer.date(object.dateCreated),
			EntityPreparer.enum<SectionEnum>(SectionEnum, object.section),
			new LocalizedString(object.name),
			new CheckItemList(_.map(object.checkItems, CheckItem.fromObject)),
			Image.fromObject(object.mainImage),
			EntityPreparer.dateOrNull(object.dateResolved)
		);
	}

	static toObject(entity: Checklist): IChecklistObject {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			dateCreated: entity.dateCreated,
			section: SectionEnum[entity.section],
			name: entity.name.toObject(),
			checkItems: entity.checkItemList.toArray(CheckItem.toObject),
			mainImage: entity.mainImage.toObject(),
			dateResolved: entity.dateResolved
		};
	}

	toObject() {
		return Checklist.toObject(this);
	}
}
