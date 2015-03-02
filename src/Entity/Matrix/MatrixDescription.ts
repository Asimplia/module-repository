
import IEntity = require('../IEntity');
import List = require('../List');
import LocalizedString = require('../Locale/LocalizedString');
import Language = require('../Locale/Language');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import QuadrantDescription = require('./QuadrantDescription');
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');
import ILocalizedStringObject = require('../Locale/ILocalizedStringObject');

export = MatrixDescription;
class MatrixDescription implements IEntity {

	get Section() { return this.section; }
	get Description() { return this.description; }
	get Icon() { return this.icon; }
	
	constructor(
		private section: SectionEnum,
		private icon: string,
		private description: LocalizedString,
		private quadrantDescriptionList: List<QuadrantDescription>
	) { }

	getQuadrantDescription(quadrant: QuadrantValueEnum) {
		return this.quadrantDescriptionList.findOneOnly((quadrantDescription: QuadrantDescription) => {
			return quadrantDescription.Quadrant == quadrant;
		});
	}

	toObject() {
		return MatrixDescription.toObject(this);
	}

	static toObject(entity: MatrixDescription) {
		return {
			section: SectionEnum[entity.section],
			icon: entity.icon,
			description: entity.description.toObject(),
			quadrantDescriptions: entity.quadrantDescriptionList.toArray(QuadrantDescription.toObject)
		};
	}

	static fromObject(object: any) {
		return new MatrixDescription(
			SectionFactory.createSectionEnum(object.section),
			object.icon,
			new LocalizedString(object.description),
			new List<QuadrantDescription>(object.quadrantDescriptions, QuadrantDescription.fromObject)
		);
	}
}
