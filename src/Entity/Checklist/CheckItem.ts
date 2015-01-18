
import IEntity = require('../IEntity');
import ICheckItemObject = require('./ICheckItemObject');
import EntityPreparer = require('../EntityPreparer');
import CheckTypeEnum = require('./CheckTypeEnum');
import ILocalizedStringObject = require('../Locale/ILocalizedStringObject');

export = CheckItem;
class CheckItem implements IEntity {

	private checkTypeNames: {[checkType: number]: ILocalizedStringObject};

	constructor(
		private checkType: CheckTypeEnum,
		private dateChecked: Date
	) {
		this.checkTypeNames = {};
		this.checkTypeNames[CheckTypeEnum.EAN] = { cs: 'EAN', en: 'EAN' };
		this.checkTypeNames[CheckTypeEnum.DESCRIPTION] = { cs: 'Popis', en: 'Description' };
		this.checkTypeNames[CheckTypeEnum.PRICE] = { cs: 'Cena', en: 'Price' };
		this.checkTypeNames[CheckTypeEnum.TRAFIC] = { cs: 'Návštěvnost', en: 'Trafic' };
		this.checkTypeNames[CheckTypeEnum.MAIN_IMAGE] = { cs: 'Obrázek', en: 'Image' };
	}
	
	get CheckType() { return this.checkType; }
	get DateChecked() { return this.dateChecked; }

	getTypeName() {
		return this.checkTypeNames[this.checkType];
	}

	static fromObject(object: ICheckItemObject) {
		return new CheckItem(
			CheckTypeEnum[object.checkType],
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
