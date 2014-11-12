
import LocalizedString = require('../Locale/LocalizedString');
import List = require('../List');
import Status = require('./Status');
import Graph = require('./Graph');
import IEntity = require('../IEntity');
import Reason = require('./Reason');
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');
import moment = require('moment');
import EntityPreparer = require('../EntityPreparer');
import PlaceholderValue = require('./PlaceholderValue');
import PriorityTypeEnum = require('./PriorityTypeEnum');
import PriorityTypeFactory = require('./PriorityTypeFactory');

export = Result;
class Result implements IEntity {

	get Id() { return this.id; }
	get Title() { return this.title; }
	get ShortTitle() { return this.shortTitle; }
	get Label() { return this.label; }
	get Text() { return this.text; }
	get ActiveStatus() { return this.activeStatus; }
	get StatusList() { return this.statusList; }
	get GraphList() { return this.graphList; }
	get EShopId() { return this.eShopId; }
	get ReasonList() { return this.reasonList; }
	get Section() { return this.section; }
	get Main() { return this.main; }
	get SituationId() { return this.situationId; }
	get ActionId() { return this.actionId; }
	get DateCreated() { return this.dateCreated; }
	get PriorityValue() { return this.priorityValue; }
	get PriorityType() { return this.priorityType; }

	set Id(value: number) { this.id = value; }
	set ActiveStatus(value: Status) {
		this.statusList.push(value);
		this.activeStatus = value;
	}

	constructor(
		private id: number,
		private title: LocalizedString,
		private shortTitle: LocalizedString,
		private label: LocalizedString,
		private text: LocalizedString,
		private activeStatus: Status,
		private statusList: List<Status>,
		private graphList: List<Graph>,
		private eShopId: number,
		private reasonList: List<Reason>,
		private section: SectionEnum,
		private main: boolean,
		private situationId: number,
		private actionId: number,
		private dateCreated: Date,
		private priorityValue: number, // define number of coins 1-5
		private priorityType: PriorityTypeEnum, // define color of coins - green/red
		private productIds: number[],
		private customerIds: number[],
		private categoryIds: number[],
		private channelIds: number[],
		private placeholderValueList: List<PlaceholderValue>
	) { }

	static fromObject(o: any/*ISuggestionResultObject*/): Result {
		return new Result(
			EntityPreparer.intOrNull(o.id),
			new LocalizedString(o.title),
			new LocalizedString(o.shortTitle),
			new LocalizedString(o.label),
			new LocalizedString(o.text),
			Status.fromObject(o.activeStatus),
			new List<Status>().pushArray(o.statuses, Status.fromObject),
			new List<Graph>().pushArray(o.graphs, Graph.fromObject),
			EntityPreparer.int(o.eShopId),
			new List<Reason>().pushArray(o.reasons, Reason.fromObject),
			SectionFactory.createSectionEnum(o.section),
			EntityPreparer.boolean(o.main),
			EntityPreparer.int(o.situationId),
			EntityPreparer.int(o.actionId),
			EntityPreparer.date(o.dateCreated),
			EntityPreparer.intOrNull(o.priorityValue),
			PriorityTypeFactory.createPriorityTypeEnum(o.priorityType),
			o.productIds,
			o.customerIds,
			o.categoryIds,
			o.channelIds,
			new List<PlaceholderValue>(o.placeholderValues, PlaceholderValue.fromObject)
		);
	}

	static toObject(entity: Result) {
		return {
			id: entity.id,
			title: entity.title ? entity.title.toObject() : null,
			shortTitle: entity.shortTitle ? entity.shortTitle.toObject() : null,
			label: entity.label ? entity.label.toObject() : null,
			text: entity.text ? entity.text.toObject() : null,
			activeStatus: entity.activeStatus ? entity.activeStatus.toObject() : null,
			statuses: entity.statusList.toArray(Status.toObject),
			graphs: entity.graphList.toArray(Graph.toObject),
			eShopId: entity.eShopId,
			reasons: entity.reasonList.toArray(Reason.toObject),
			section: SectionEnum[entity.section],
			main: entity.main,
			situationId: entity.situationId,
			actionId: entity.actionId,
			dateCreated: entity.dateCreated,
			priorityValue: entity.priorityValue,
			priorityType: PriorityTypeEnum[entity.priorityType],
			productIds: entity.productIds,
			customerIds: entity.customerIds,
			categoryIds: entity.categoryIds,
			channelIds: entity.channelIds,
			placeholderValues: entity.placeholderValueList.toArray(PlaceholderValue.toObject)
		};
	}

	toObject() {
		return Result.toObject(this);
	}

	getMainReason() {
		return this.reasonList.first();
	}

	isExpired() {
		return this.activeStatus.isStateExpired();
	}

	isSectionProduct() {
		return this.section == SectionEnum.PRODUCT;
	}

	isSectionCustomer() {
		return this.section == SectionEnum.CUSTOMER;
	}

	isSectionChannel() {
		return this.section == SectionEnum.CHANNEL;
	}
}
