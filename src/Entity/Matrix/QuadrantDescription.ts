
import IEntity = require('../IEntity');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import QuadrantValueFactory = require('./QuadrantValueFactory');
import LocalizedString = require('../Locale/LocalizedString');
import ILocalizedStringObject = require('../Locale/ILocalizedStringObject');

export = QuadrantDescription;
class QuadrantDescription implements IEntity {

	get Quadrant() { return this.quadrant; }
	get Description() { return this.description; }
	get Icon() { return this.icon; }

	constructor(
		private quadrant: QuadrantValueEnum,
		private description: LocalizedString,
		private icon: string
	) { }

	toObject() {
		return QuadrantDescription.toObject(this);
	}

	static toObject(entity: QuadrantDescription) {
		var description: ILocalizedStringObject = entity.description.toObject();
		return {
			quadrant: QuadrantValueEnum[entity.quadrant],
			description: description,
			icon: entity.icon
		};
	}

	static fromObject(object: any) {
		return new QuadrantDescription(
			QuadrantValueFactory.createQuadrantValueEnum(object.quadrant),
			new LocalizedString(object.description),
			object.icon
		);
	}
}
