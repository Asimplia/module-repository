
import IEntity = require('../IEntity');
import List = require('../List');
import Signal = require('./Signal');
import MatrixProduct = require('./MatrixProduct');
import SectionEnum = require('../Section/SectionEnum');
import EntityPreparer = require('../EntityPreparer');

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
	get ProductId() {
		if (!(this.signalList.first().Matrix instanceof MatrixProduct)) {
			return null;
		}
		var productMatrix = <MatrixProduct> this.signalList.first().Matrix;
		return productMatrix.Product.Id;
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
	static fromRow(r: any) {
		return new Situation(
			EntityPreparer.intOrNull(r[Situation.COLUMN_SITUATION_ID]),
			new List<Signal>(),
			EntityPreparer.date(r[Situation.COLUMN_DATE_CREATED]),
			EntityPreparer.dateOrNull(r[Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED])
		);
	}

	getMatrixProductBySection(section: SectionEnum) {
		var signal = this.signalList.find((signal: Signal) => {
			return signal.Matrix.Section == section;
		});
		return signal ? <MatrixProduct> signal.Matrix : null;
	}
}
