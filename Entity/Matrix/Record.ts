
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
	get ChangeRelative(): number { return this.changeRelative; }
	get ChangeWeight(): number { return this.changeWeight; }
	get ScoreAbsolute(): number { return this.scoreAbsolute; }
	get ScoreRelative(): number { return this.scoreRelative; }
	get ScoreWeight(): number { return this.scoreWeight; }
	get Prediction(): number { return this.prediction; }
	get InputValueX(): number { return this.inputValueX; }
	get InputValueY(): number { return this.inputValueY; }
	get ChangeValueX(): number { return this.changeValueX; }
	get ChangeValueY(): number { return this.changeValueY; }
	get Tangens(): number { return this.tangens; }
	get ChangeTangens(): number { return this.changeTangens; }
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
		private changeValueY: number,
		private tangens: number,
		private changeTangens: number
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

	static createQuadrantValueEnum(quadrant: any) {
		switch (quadrant) {
			case QuadrantValueEnum[QuadrantValueEnum.RIGHT_TOP]:
			case QuadrantValueEnum.RIGHT_TOP:
				return QuadrantValueEnum.RIGHT_TOP;
			case QuadrantValueEnum[QuadrantValueEnum.LEFT_TOP]:
			case QuadrantValueEnum.LEFT_TOP:
				return QuadrantValueEnum.LEFT_TOP;
			case QuadrantValueEnum[QuadrantValueEnum.RIGHT_BOTTOM]:
			case QuadrantValueEnum.RIGHT_BOTTOM:
				return QuadrantValueEnum.RIGHT_BOTTOM;
			case QuadrantValueEnum[QuadrantValueEnum.LEFT_BOTTOM]:
			case QuadrantValueEnum.LEFT_BOTTOM:
				return QuadrantValueEnum.LEFT_BOTTOM;
			case QuadrantValueEnum[QuadrantValueEnum.RIGHT]:
			case QuadrantValueEnum.RIGHT:
				return QuadrantValueEnum.RIGHT;
			case QuadrantValueEnum[QuadrantValueEnum.LEFT]:
			case QuadrantValueEnum.LEFT:
				return QuadrantValueEnum.LEFT;
			case QuadrantValueEnum[QuadrantValueEnum.BOTTOM]:
			case QuadrantValueEnum.BOTTOM:
				return QuadrantValueEnum.BOTTOM;
			case QuadrantValueEnum[QuadrantValueEnum.TOP]:
			case QuadrantValueEnum.TOP:
				return QuadrantValueEnum.TOP;
		}
		return QuadrantValueEnum.UNKNOWN;
	}
}
