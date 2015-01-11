
import IEntity = require('../IEntity');
import IHashIdentificableEntity = require('../Common/IHashIdentificableEntity');
import SectionEnum = require('../Section/SectionEnum');
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

	constructor(
		private id: string,
		private eShopId: number,
		private dateCreated: Date,
		private section: SectionEnum,
		private name: LocalizedString,
		private checkItemList: CheckItemList,
		private mainImage: Image,
		private dateResolved: Date
	) {}

	static fromObject(object: IChecklistObject) {
		return new Checklist(
			EntityPreparer.id(object.id),
			EntityPreparer.int(object.eShopId),
			EntityPreparer.date(object.dateCreated),
			SectionEnum[object.section],
			new LocalizedString(object.name),
			new CheckItemList(object.checkItems),
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
