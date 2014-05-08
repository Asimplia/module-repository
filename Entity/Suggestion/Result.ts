
import LocalizedString = require('../Locale/LocalizedString');
import List = require('../List');
import Status = require('./Status');
import Graph = require('./Graph');
import IEntity = require('../IEntity');

export = Result;
class Result implements IEntity {
	constructor(
		private id: Number,
		private title: LocalizedString,
		private shortTitle: LocalizedString,
		private label: LocalizedString,
		private text: LocalizedString,
		private activeStatus: Status,
		private statusList: List<Status>,
		private graphList: List<Graph>
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
			new List<Graph>().pushArray(o.graphs, Graph.fromObject)
		);
	}
}