
import LocalizedString = require('../Locale/LocalizedString');
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');
import List = require('../List');
import FactorDefinition = require('./FactorDefinition');
import IEntity = require('../IEntity');
import ActionPlaceholderEnum = require('./ActionPlaceholderEnum');
import ActionPlaceholderFactory = require('./ActionPlaceholderFactory');
import ArrayHelper = require('../Util/ArrayHelper');
import PriorityTypeEnum = require('./PriorityTypeEnum');
import PriorityTypeFactory = require('./PriorityTypeFactory');
import EntityPreparer = require('../EntityPreparer');

export = Action;
class Action implements IEntity {

	get Id() { return this.id; }
	set Id(value) { this.id = value; }
	get Name() { return this.name; }
	set Name(value) { this.name = value; }
	get ShortName() { return this.shortName; }
	set ShortName(value) { this.shortName = value; }
	get Text() { return this.text; }
	set Text(value) { this.text = value; }
	get Section() { return this.section; }
	set Section(value) { this.section = value; }
	get FactorDefinitionList() { return this.factorDefinitionList; }
	set FactorDefinitionList(value) { this.factorDefinitionList = value; }
	get Placeholders() { return this.placeholders; }
	set Placeholders(value) { this.placeholders = value; }
	get PriorityType() { return this.priorityType; }
	get Main() { return this.main; }

	constructor(
		private id: number,
		private name: LocalizedString,
		private shortName: LocalizedString,
		private text: LocalizedString,
		private section: SectionEnum,
		private factorDefinitionList: List<FactorDefinition>,
		private placeholders: ActionPlaceholderEnum[],
		private priorityType: PriorityTypeEnum,
		private main: boolean
	) { }

	static fromObject(o: any/*ISuggestionActionObject*/): Action {
		return new Action(
			EntityPreparer.intOrNull(o.id),
			new LocalizedString(o.name),
			new LocalizedString(o.shortName),
			new LocalizedString(o.text),
			SectionFactory.getGroupSection(SectionFactory.createSectionEnum(o.section)),
			new List<FactorDefinition>().pushArray(o.factorDefinitions, FactorDefinition.fromObject),
			ArrayHelper.mapFilterNulls(o.placeholders, (placeholder: string) => { return ActionPlaceholderFactory.createActionPlaceholderEnum(placeholder); }),
			PriorityTypeFactory.createPriorityTypeEnum(o.priorityType),
			EntityPreparer.boolean(o.main)
		);
	}

	static toObject(entity: Action): any {
		return {
			id: entity.id,
			name: entity.name.toObject(),
			shortName: entity.shortName.toObject(),
			text: entity.text.toObject(),
			section: SectionEnum[entity.section],
			factorDefinitions: entity.factorDefinitionList.toArray(FactorDefinition.toObject),
			placeholders: ArrayHelper.mapFilterNulls(entity.placeholders, (placeholder: ActionPlaceholderEnum) => { return ActionPlaceholderEnum[placeholder]; }),
			priorityType: PriorityTypeEnum[entity.priorityType],
			main: entity.main
		};
	}

	toObject(): any {
		return Action.toObject(this);
	}

}
