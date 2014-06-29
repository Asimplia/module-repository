
import IEntity = require('../IEntity');
import Record = require('./Record');
import QuadrantValueEnum = require('./QuadrantValueEnum');

export = SignalThreshold;
class SignalThreshold implements IEntity {

	get Type(): string { return this.type; }
	get Name(): string { return this.name; }

	constructor(
		private type: string,
		private name: string,
		private thresholdValueQ1: number,
		private thresholdValueQ2: number,
		private thresholdValueQ3: number,
		private thresholdValueQ4: number,
		private priorityQ1: number,
		private priorityQ2: number,
		private priorityQ3: number,
		private priorityQ4: number,
		private descriptionQ1: string,
		private descriptionQ2: string,
		private descriptionQ3: string,
		private descriptionQ4: string
		) { }

	toObject() {
		return {

		};
	}

	getThresholdValue(quadrant: QuadrantValueEnum) {
		switch (quadrant) {
			case QuadrantValueEnum.RIGHT_TOP: return this.thresholdValueQ1;
			case QuadrantValueEnum.LEFT_TOP: return this.thresholdValueQ2;
			case QuadrantValueEnum.RIGHT_BOTTOM: return this.thresholdValueQ3;
			case QuadrantValueEnum.LEFT_BOTTOM: return this.thresholdValueQ4;
		}
	}

	isSignalInQuadrant(record: Record): boolean {
		var thresholdValue = this.getThresholdValue(record.Quadrant);
		var change = record.getChange();
		return change >= thresholdValue;
	}
}
