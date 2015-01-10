
import IEntity = require('../IEntity');
import SectionEnum = require('../Section/SectionEnum');
import LocalizedString = require('../Locale/LocalizedString');
import CheckItemList = require("./CheckItemList");
import CheckItem = require("./CheckItem");
import Image = require("../Image/Image");
import IChecklistObject = require('../../Definition/Checklist/IChecklistObject');
import EntityPreparer = require('../EntityPreparer');

export = Checklist;
class Checklist implements IEntity {

	get Id() { return this.id; }
	get Section() { return this.section; }

	constructor(
		private id: string,
		private dateCreated: Date,
		private section: SectionEnum,
		private name: LocalizedString,
		private checkItemList: CheckItemList,
		private mainImage: Image,
		private dateResolved: Date
	) {}

	static fromObject(object: IChecklistObject) {
		return new Checklist(
			EntityPreparer.string(object.id),
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
