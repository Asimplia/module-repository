
import FactorTypeEnum = require('./FactorTypeEnum');
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');
import ColumnEnum = require('../Matrix/ColumnEnum');
import ColumnFactory = require('../Matrix/ColumnFactory');
import ShiftValueEnum = require('../Factor/ShiftValueEnum');
import LocalizedString = require('../Locale/LocalizedString');
import EntityPreparer = require('../EntityPreparer');

export = Factor;
class Factor {

	set Id(value: number) { this.id = value; }
	get Id() { return this.id; }
	set FactorType(value: FactorTypeEnum) { this.factorType = value; }
	get FactorType() { return this.factorType; }
	get Column() { return this.column; }
	get Section() { return this.section; }
	get Name() { return this.name; }
	get Label() { return this.label; }

	constructor(
		private id: number,
		private name: string,
		private description: string,
		private section: SectionEnum,
		private weight: number,
		private factorType: FactorTypeEnum,
		private column: ColumnEnum,
		private label: LocalizedString
	) { }

	static fromObject(o: any/*FactorObject*/): Factor {
		return new Factor(
			EntityPreparer.intOrNull(o.id),
			EntityPreparer.stringOrNull(o.name),
			EntityPreparer.stringOrNull(o.description),
			SectionFactory.createSectionEnum(o.section),
			EntityPreparer.floatOrNull(o.weight),
			Factor.createTypeEnum(o.factorType),
			ColumnFactory.createColumnEnum(o.column),
			new LocalizedString(o.label)
		);
	}

	static toObject(entity: Factor) {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
			section: SectionEnum[entity.section],
			weight: entity.weight,
			factorType: FactorTypeEnum[entity.factorType],
			column: ColumnEnum[entity.column],
			label: entity.label.toObject()
		};
	}

	toObject() {
		return Factor.toObject(this);
	}

	static createTypeEnum(type: string): FactorTypeEnum {
		switch (type) {
			case FactorTypeEnum[FactorTypeEnum.QUADRANT]:
				return FactorTypeEnum.QUADRANT;
			case FactorTypeEnum[FactorTypeEnum.SHIFT]:
				return FactorTypeEnum.SHIFT;
		}
		return null;
	}

	static createShiftValueEnum(shiftValue: string) {
		switch (shiftValue) {
			case ShiftValueEnum[ShiftValueEnum.FALL]:
				return ShiftValueEnum.FALL;
			case ShiftValueEnum[ShiftValueEnum.STAY]:
				return ShiftValueEnum.STAY;
			case ShiftValueEnum[ShiftValueEnum.RISE]:
				return ShiftValueEnum.RISE;
		}
		return null;
	}

}

