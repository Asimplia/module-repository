
import IEntity = require('../IEntity');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import QuadrantValueFactory = require('./QuadrantValueFactory');
import LocalizedString = require('../Locale/LocalizedString');

export = QuadrantDescription;
class QuadrantDescription implements IEntity {
	
	get Quadrant() { return this.quadrant; }
	get Description() { return this.description; }

	constructor(
		private quadrant: QuadrantValueEnum,
		private description: LocalizedString
	) { }

	toObject() {
		return QuadrantDescription.toObject(this);
	}

	static toObject(entity: QuadrantDescription) {
		return {
			quadrant: QuadrantValueEnum[entity.quadrant],
			description: entity.description.toObject()
		};
	}

	static fromObject(object: any) {
		return new QuadrantDescription(
			QuadrantValueFactory.createQuadrantValueEnum(object.quadrant),
			new LocalizedString(object.description)
		);
	}
}
