
/// <reference path="../../../typings/moment/moment.d.ts" />

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

export = Result;
class Result implements IEntity {

	get Id() { return this.id; }
	set Id(value: number) { this.id = value; }
	get Title() { return this.title; }
	set Title(value: LocalizedString) { this.title = value; }
	get ShortTitle() { return this.shortTitle; }
	set ShortTitle(value: LocalizedString) { this.shortTitle = value; }
	get Label() { return this.label; }
	set Label(value: LocalizedString) { this.label = value; }
	get Text() { return this.text; }
	set Text(value: LocalizedString) { this.text = value; }
	get ActiveStatus() { return this.activeStatus; }
	set ActiveStatus(value: Status) {
		this.statusList.push(value);
		this.activeStatus = value;
	}
	get StatusList() { return this.statusList; }
	set StatusList(value: List<Status>) { this.statusList = value; }
	get GraphList() { return this.graphList; }
	set GraphList(value: List<Graph>) { this.graphList = value; }
	get EShopId() { return this.eShopId; }
	set EShopId(value: number) { this.eShopId = value; }
	get ReasonList() { return this.reasonList; }
	get Section() { return this.section; }
	get Main() { return this.main; }
	get SituationId() { return this.situationId; }
	get ActionId() { return this.actionId; }

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
		private actionId: number
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
			EntityPreparer.int(o.actionId)
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
			actionId: entity.actionId
		};
	}

	toObject() {
		return Result.toObject(this);
	}

	getMainReason() {
		return this.reasonList.first();
	}

	isExpired() {
		return moment() > moment(this.activeStatus.DateValidTo);
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
