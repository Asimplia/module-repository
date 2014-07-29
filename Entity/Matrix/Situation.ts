
import IEntity = require('../IEntity');
import List = require('../List');
import Signal = require('./Signal');

export = Situation;
class Situation implements IEntity {

	public static TABLE_NAME = 'situation';
	public static COLUMN_SITUATION_ID = 'situationid';
	public static COLUMN_DATE_CREATED = 'datecreated';
	public static COLUMN_DATE_SUGGESTION_RESULT_CREATED = 'datesuggestionresultcreated';

	get Id(): number { return this.id; }
	set Id(id: number) { this.id = id; }
	get DateCreated() { return this.dateCreated; }
	get SignalList() { return this.signalList; }
	get DateSuggestionResultCreated() { return this.dateSuggestionResultCreated; }
	set DateSuggestionResultCreated(value) { this.dateSuggestionResultCreated = value; }
	get EShopId() {
		return this.signalList.first().Matrix.EShopId;
	}

	constructor(
		private id,
		private signalList: List<Signal>,
		private dateCreated: Date,
		private dateSuggestionResultCreated: Date
	) {	}

	static toObject(entity: Situation) {
		return {
			id: entity.id,
			dateCreated: entity.dateCreated,
			dateSuggestionResultCreated: entity.dateSuggestionResultCreated,
			signals: entity.signalList.toArray(Signal.toObject)
		};
	}

	toObject() {
		return Situation.toObject(this);
	}
}
