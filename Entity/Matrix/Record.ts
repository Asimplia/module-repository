
import IEntity = require('../IEntity');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import Product = require('../EShop/Product');

export = Record;
class Record implements IEntity {

	get Id(): number { return this.id; }
	get Type(): string { return this.type; }
	set Type(value: string) { this.type = value; }
	get Description(): string { return this.description; }
	set Description(value: string) { this.description = value; }
	get Quadrant(): QuadrantValueEnum { return this.quadrant; }
	get ChangeAbsolute(): number { return this.changeAbsolute; }
	get Product(): Product { return null; } // TODO

	constructor(
		private id,
		private type: string,
		private description: string,
		private scoreAbsolute: number,
		private scoreRelative: number,
		private scoreWeight: number,
		private changeAbsolute: number,
		private changeRelative: number,
		private changeWeight: number,
		private prediction: number,
		private group: number,
		private quadrant: QuadrantValueEnum,
		private dateValid: Date,
		private inputValueX: number,
		private inputValueY: number,
		private changeValueX: number,
		private changeValueY: number
		) { }

	toObject(): any {
		return {
			type: this.Type,
			description: this.Description
		};
	}

	getChange() {
		return this.changeWeight;
	}

	static createQuadrantValueEnum(quadrant: string) {
		switch (quadrant) {
			case QuadrantValueEnum[QuadrantValueEnum.RIGHT_TOP]:
				return QuadrantValueEnum.RIGHT_TOP;
			case QuadrantValueEnum[QuadrantValueEnum.LEFT_TOP]:
				return QuadrantValueEnum.LEFT_TOP;
			case QuadrantValueEnum[QuadrantValueEnum.RIGHT_BOTTOM]:
				return QuadrantValueEnum.RIGHT_BOTTOM;
			case QuadrantValueEnum[QuadrantValueEnum.LEFT_BOTTOM]:
				return QuadrantValueEnum.LEFT_BOTTOM;
			case QuadrantValueEnum[QuadrantValueEnum.RIGHT]:
				return QuadrantValueEnum.RIGHT;
			case QuadrantValueEnum[QuadrantValueEnum.LEFT]:
				return QuadrantValueEnum.LEFT;
			case QuadrantValueEnum[QuadrantValueEnum.BOTTOM]:
				return QuadrantValueEnum.BOTTOM;
			case QuadrantValueEnum[QuadrantValueEnum.TOP]:
				return QuadrantValueEnum.TOP;
		}
		return QuadrantValueEnum.UNKNOWN;
	}
}
