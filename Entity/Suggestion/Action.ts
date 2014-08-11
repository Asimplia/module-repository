
/// <reference path="../../node_modules/asimplia-util/index.node.d.ts" />

import LocalizedString = require('../Locale/LocalizedString');
import SectionEnum = require('../Section/SectionEnum');
import List = require('../List');
import FactorDefinition = require('./FactorDefinition');
import IEntity = require('../IEntity');
import ActionPlaceholderEnum = require('./ActionPlaceholderEnum');
import AsimpliaUtil = require('asimplia-util');
import PriorityTypeEnum = require('./PriorityTypeEnum');

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
		private id: Number,
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
			o.id,
			new LocalizedString(o.name),
			new LocalizedString(o.shortName),
			new LocalizedString(o.text),
			Action.createSectionEnum(o.section),
			new List<FactorDefinition>().pushArray(o.factorDefinitions, FactorDefinition.fromObject),
			AsimpliaUtil.ArrayHelper.mapFilterNulls(o.placeholders, (placeholder: string) => { return Action.createPlaceholderEnum(placeholder); }),
			Action.createPriorityTypeEnum(o.priorityType),
			o.main
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
			placeholders: AsimpliaUtil.ArrayHelper.mapFilterNulls(entity.placeholders, (placeholder: ActionPlaceholderEnum) => { return ActionPlaceholderEnum[placeholder]; }),
			priorityType: PriorityTypeEnum[entity.priorityType],
			main: entity.main
		};
	}

	toObject(): any {
		return Action.toObject(this);
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

	static createPriorityTypeEnum(priorityType: string) {
		switch (priorityType) {
			case PriorityTypeEnum[PriorityTypeEnum.RED]:
				return PriorityTypeEnum.RED;
			case PriorityTypeEnum[PriorityTypeEnum.GREEN]:
				return PriorityTypeEnum.GREEN;
		}
		return PriorityTypeEnum.UNKNOWN;
	}

	static createPlaceholderEnum(placeholder: string) {
		switch (placeholder) {
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_NAME]:
				return ActionPlaceholderEnum.PRODUCT_NAME;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.DISCOUNT_VALUE]:
				return ActionPlaceholderEnum.DISCOUNT_VALUE;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.COMMERCIAL_CHANELS]:
				return ActionPlaceholderEnum.COMMERCIAL_CHANELS;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_PRICE]:
				return ActionPlaceholderEnum.PRODUCT_PRICE;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRICE_CHANGE]:
				return ActionPlaceholderEnum.PRICE_CHANGE;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_PACKAGE_OPTION]:
				return ActionPlaceholderEnum.PRODUCT_PACKAGE_OPTION;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_SKU]:
				return ActionPlaceholderEnum.PRODUCT_SKU;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_STOCKING_TIME]:
				return ActionPlaceholderEnum.PRODUCT_STOCKING_TIME;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.CUSTOMERS_FOR_PRODUCT]:
				return ActionPlaceholderEnum.CUSTOMERS_FOR_PRODUCT;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_MARGIN_RATE]:
				return ActionPlaceholderEnum.PRODUCT_MARGIN_RATE;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_CONVERSION_RATE]:
				return ActionPlaceholderEnum.PRODUCT_CONVERSION_RATE;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.CATEGORY_NAME]:
				return ActionPlaceholderEnum.CATEGORY_NAME;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.CATEGORY_CHANGE_IN_SALE]:
				return ActionPlaceholderEnum.CATEGORY_CHANGE_IN_SALE;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.BENEFITS]:
				return ActionPlaceholderEnum.BENEFITS;
		}
		return null;
	}

}
