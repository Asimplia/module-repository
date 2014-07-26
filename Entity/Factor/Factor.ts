
import FactorTypeEnum = require('./FactorTypeEnum');
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');
import ColumnEnum = require('../Matrix/ColumnEnum');
import ShiftValueEnum = require('../Factor/ShiftValueEnum');

export = Factor;
class Factor {

	set Id(value: number) { this.id = value; }
	get Id() { return this.id; }
	set FactorType(value: FactorTypeEnum) { this.factorType = value; }
	get FactorType() { return this.factorType; }
	get Column() { return this.column; }
	get Section() { return this.section; }

	constructor(
		private id: number,
		private name: string,
		private description: string,
		private section: SectionEnum,
		private weight: number,
		private factorType: FactorTypeEnum,
		private column: ColumnEnum
	) { }

	static fromObject(o: any/*FactorObject*/): Factor {
		return new Factor(
			o.id,
			o.name,
			o.description,
			SectionFactory.createSectionEnum(o.section),
			o.weight,
			Factor.createTypeEnum(o.factorType),
			Factor.createColumnEnum(o.column)
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
			column: ColumnEnum[entity.column]
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

	static createColumnEnum(column: string) {
		switch (column) {
			case ColumnEnum[ColumnEnum.SCORE_ABSOLUTE]:
				return ColumnEnum.SCORE_ABSOLUTE;
			case ColumnEnum[ColumnEnum.SCORE_RELATIVE]:
				return ColumnEnum.SCORE_RELATIVE;
			case ColumnEnum[ColumnEnum.SCORE_WEIGHT]:
				return ColumnEnum.SCORE_WEIGHT;
			case ColumnEnum[ColumnEnum.CHANGE_ABSOLUTE]:
				return ColumnEnum.CHANGE_ABSOLUTE;
			case ColumnEnum[ColumnEnum.CHANGE_RELATIVE]:
				return ColumnEnum.CHANGE_RELATIVE;
			case ColumnEnum[ColumnEnum.CHANGE_WEIGHT]:
				return ColumnEnum.CHANGE_WEIGHT;
			case ColumnEnum[ColumnEnum.PREDICTION]:
				return ColumnEnum.PREDICTION;
			case ColumnEnum[ColumnEnum.INPUT_VALUE_X]:
				return ColumnEnum.INPUT_VALUE_X;
			case ColumnEnum[ColumnEnum.INPUT_VALUE_Y]:
				return ColumnEnum.INPUT_VALUE_Y;
			case ColumnEnum[ColumnEnum.CHANGE_VALUE_X]:
				return ColumnEnum.CHANGE_VALUE_X;
			case ColumnEnum[ColumnEnum.CHANGE_VALUE_Y]:
				return ColumnEnum.CHANGE_VALUE_Y;
			case ColumnEnum[ColumnEnum.TANGENS]:
				return ColumnEnum.TANGENS;
			case ColumnEnum[ColumnEnum.CHANGE_TANGENS]:
				return ColumnEnum.CHANGE_TANGENS;
		}
		return ColumnEnum.UNKNOWN;
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

