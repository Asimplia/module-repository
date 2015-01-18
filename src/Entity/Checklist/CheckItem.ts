
import IEntity = require('../IEntity');
import ICheckItemObject = require('./ICheckItemObject');
import EntityPreparer = require('../EntityPreparer');
import CheckTypeEnum = require('./CheckTypeEnum');
import LocalizedString = require('../Locale/LocalizedString');

export = CheckItem;
class CheckItem implements IEntity {

	private checkTypeNames: {[checkType: number]: LocalizedString};
	
	get CheckType() { return this.checkType; }
	get DateChecked() { return this.dateChecked; }

	constructor(
		private checkType: CheckTypeEnum,
		private dateChecked: Date
	) {
		this.checkTypeNames = {};
		this.checkTypeNames[CheckTypeEnum.EAN] = new LocalizedString({ cs: 'EAN', en: 'EAN' });
		this.checkTypeNames[CheckTypeEnum.DESCRIPTION] = new LocalizedString({ cs: 'Popis', en: 'Description' });
		this.checkTypeNames[CheckTypeEnum.PRICE] = new LocalizedString({ cs: 'Cena', en: 'Price' });
		this.checkTypeNames[CheckTypeEnum.TRAFIC] = new LocalizedString({ cs: 'Návštěvnost', en: 'Trafic' });
		this.checkTypeNames[CheckTypeEnum.MAIN_IMAGE] = new LocalizedString({ cs: 'Obrázek', en: 'Image' });
	}

	getCheckTypeName() {
		return this.checkTypeNames[this.checkType];
	}

	isChecked() {
		return this.dateChecked !== null;
	}

	static fromObject(object: ICheckItemObject) {
		return new CheckItem(
			EntityPreparer.enum<CheckTypeEnum>(CheckTypeEnum, object.checkType),
			EntityPreparer.dateOrNull(object.dateChecked)
		);
	}

	static toObject(entity: CheckItem): ICheckItemObject {
		return {
			checkType: CheckTypeEnum[entity.checkType],
			dateChecked: entity.dateChecked
		};
	}

	toObject() {
		return CheckItem.toObject(this);
	}
}
