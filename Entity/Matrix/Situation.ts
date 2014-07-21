
import IEntity = require('../IEntity');
import List = require('../List');
import Signal = require('./Signal');

export = Situation;
class Situation implements IEntity {

	public static TABLE_NAME = 'situation';
	public static COLUMN_SITUATION_ID = 'situationid';
	public static COLUMN_DATE_CREATED = 'datecreated';

	get Id(): number { return this.id; }
	set Id(id: number) { this.id = id; }
	get DateCreated() { return this.dateCreated; }
	get SignalList() { return this.signalList; }

	constructor(
		private id,
		private signalList: List<Signal>,
		private dateCreated: Date
	) {	}

	static toObject(entity: Situation) {
		return {
			id: entity.id,
			dateCreated: entity.dateCreated,
			signals: entity.signalList.toArray(Signal.toObject)
		};
	}

	toObject() {
		return Situation.toObject(this);
	}
}
