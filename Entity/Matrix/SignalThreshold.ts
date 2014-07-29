
import IEntity = require('../IEntity');
import Matrix = require('./Matrix');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');

export = SignalThreshold;
class SignalThreshold implements IEntity {

	get Section(): SectionEnum { return this.section; }
	get Name(): string { return this.name; }

	constructor(
		private section: SectionEnum,
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

	static fromObject(o: any) {
		return new SignalThreshold(
			SectionFactory.createSectionEnum(o.section),
			o.name,
			o.thresholdValue.q1,
			o.thresholdValue.q2,
			o.thresholdValue.q3,
			o.thresholdValue.q4,
			o.priority.q1,
			o.priority.q2,
			o.priority.q3,
			o.priority.q4,
			o.description.q1,
			o.description.q2,
			o.description.q3,
			o.description.q4
		);
	}

	toObject() {
		return {
			section: SectionEnum[this.section],
			name: this.name,
			thresholdValue: {
				q1: this.thresholdValueQ1,
				q2: this.thresholdValueQ2,
				q3: this.thresholdValueQ3,
				q4: this.thresholdValueQ4
			},
			priority: {
				q1: this.priorityQ1,
				q2: this.priorityQ2,
				q3: this.priorityQ3,
				q4: this.priorityQ4
			},
			description: {
				q1: this.descriptionQ1,
				q2: this.descriptionQ2,
				q3: this.descriptionQ3,
				q4: this.descriptionQ4
			}
		};
	}

	getThresholdValue(quadrant: QuadrantValueEnum) {
		switch (quadrant) {
			case QuadrantValueEnum.RIGHT_TOP: return this.thresholdValueQ1;
			case QuadrantValueEnum.LEFT_TOP: return this.thresholdValueQ2;
			case QuadrantValueEnum.RIGHT_BOTTOM: return this.thresholdValueQ3;
			case QuadrantValueEnum.LEFT_BOTTOM: return this.thresholdValueQ4;
		}
		throw new Error('Specified quadrant not supported');
	}

	isSignalInQuadrant(record: Matrix): boolean {
		var thresholdValue = this.getThresholdValue(record.Quadrant);
		var change = record.getChange();
		return change >= thresholdValue;
	}
}
