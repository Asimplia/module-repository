
import LocalizedString = require('../Locale/LocalizedString');
import List = require('../List');
import Status = require('./Status');
import Graph = require('./Graph');
import IEntity = require('../IEntity');

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
	get ClientId() { return this.clientId; }
	set ClientId(value: number) { this.clientId = value; }

	constructor(
		private id: number,
		private title: LocalizedString,
		private shortTitle: LocalizedString,
		private label: LocalizedString,
		private text: LocalizedString,
		private activeStatus: Status,
		private statusList: List<Status>,
		private graphList: List<Graph>,
		private clientId: number
	) { }

	static fromObject(o: any/*ISuggestionResultObject*/): Result {
		return new Result(
			o.id,
			new LocalizedString(o.title),
			new LocalizedString(o.shortTitle),
			new LocalizedString(o.label),
			new LocalizedString(o.text),
			Status.fromObject(o.activeStatus),
			new List<Status>().pushArray(o.statuses, Status.fromObject),
			new List<Graph>().pushArray(o.graphs, Graph.fromObject),
			o.clientId
		);
	}

	static toObject(entity: Result) {
		return {
			id: entity.id,
			title: entity.title,
			shortTitle: entity.shortTitle,
			label: entity.label,
			text: entity.text,
			activeStatus: entity.activeStatus ? entity.activeStatus.toObject() : null,
			statuses: entity.statusList.toArray(Status.toObject),
			graphs: entity.graphList.toArray(Graph.toObject),
			clientId: entity.clientId
		};
	}

	toObject() {
		return Result.toObject(this);
	}
}
