
import IEntity = require('../IEntity');
import QuadrantValueEnum = require('./QuadrantValueEnum');

export = Record;
class Record implements IEntity {

	get Id(): number { return this.id; }
	get Type(): string { return this.type; }
	set Type(value: string) { this.type = value; }
	get Description(): string { return this.description; }
	set Description(value: string) { this.description = value; }
	get Quadrant(): QuadrantValueEnum { return this.quadrant; }

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
		var x = this.inputValueX - this.changeValueX;
		var y = this.inputValueX - this.changeValueY;
		return Math.sqrt(x*x + y*y)
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
		}
		return QuadrantValueEnum.UNKNOWN;
	}
}
