
import ArrayHelper = require('../../../Util/ArrayHelper');
import FactorTypeEnum = require('./FactorTypeEnum');
import SectionEnum = require('../Section/SectionEnum');

export = Factor;
class Factor {

	set Id(value) { this.id = value; }
	get Id() { return this.id; }

	constructor(
		private id: number,
		private name: string,
		private description: string,
		private section: SectionEnum,
		private weight: number,
		private type: FactorTypeEnum
	) { }

	static fromObject(o: any/*FactorObject*/): Factor {
		return new Factor(
			o.id,
			o.name,
			o.description,
			Factor.createSectionEnum(o.section),
			o.weight,
			Factor.createTypeEnum(o.type)
		);
	}

	static toObject(entity: Factor) {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
			section: SectionEnum[entity.section],
			weight: entity.weight,
			type: FactorTypeEnum[entity.type]
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

	static createSectionEnum(section: string) {
		switch (section) {
			case SectionEnum[SectionEnum.CUSTOMER]:
				return SectionEnum.CUSTOMER;
			case SectionEnum[SectionEnum.PRODUCT]:
				return SectionEnum.PRODUCT;
			case SectionEnum[SectionEnum.CHANNEL]:
				return SectionEnum.CHANNEL;
		}
		return SectionEnum.UNKNOWN;
	}
}
