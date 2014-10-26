
import IEntity = require('../IEntity');
import List = require('../List');
import Signal = require('./Signal');
import MatrixProduct = require('./MatrixProduct');
import MatrixCategory = require('./MatrixCategory');
import SectionEnum = require('../Section/SectionEnum');
import EntityPreparer = require('../EntityPreparer');

export = Situation;
class Situation implements IEntity {

	public static TABLE_NAME = 'analytical.situation';
	public static COLUMN_SITUATION_ID = 'situationid';
	public static COLUMN_DATE_CREATED = 'datecreated';
	public static COLUMN_DATE_SUGGESTION_RESULT_CREATED = 'datesuggestionresultcreated';
	public static COLUMN_DATE_SUGGESTION_RESULT_PROCESSED = 'datesuggestionresultprocessed';

	get Id(): number { return this.id; }
	set Id(id: number) { this.id = id; }
	get DateCreated() { return this.dateCreated; }
	get SignalList() { return this.signalList; }
	get DateSuggestionResultCreated() { return this.dateSuggestionResultCreated; }
	set DateSuggestionResultCreated(value) { this.dateSuggestionResultCreated = value; }
	get DateSuggestionResultProcessed() { return this.dateSuggestionResultProcessed; }
	set DateSuggestionResultProcessed(value) { this.dateSuggestionResultProcessed = value; }
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
	get CategoryId() {
		if (!(this.signalList.first().Matrix instanceof MatrixCategory)) {
			return null;
		}
		var categoryMatrix = <MatrixCategory> this.signalList.first().Matrix;
		return categoryMatrix.Category.Id;
	}

	constructor(
		private id,
		private signalList: List<Signal>,
		private dateCreated: Date,
		private dateSuggestionResultCreated: Date,
		private dateSuggestionResultProcessed: Date
	) {	}

	static toObject(entity: Situation) {
		return {
			id: entity.id,
			dateCreated: entity.dateCreated,
			dateSuggestionResultCreated: entity.dateSuggestionResultCreated,
			dateSuggestionResultProcessed: entity.dateSuggestionResultProcessed,
			signals: entity.signalList.toArray(Signal.toObject)
		};
	}

	toObject() {
		return Situation.toObject(this);
	}
	static fromRow(r: any) {
		return new Situation(
			EntityPreparer.intOrNull(r[Situation.TABLE_NAME + '.' + Situation.COLUMN_SITUATION_ID]),
			new List<Signal>(),
			EntityPreparer.date(r[Situation.TABLE_NAME + '.' + Situation.COLUMN_DATE_CREATED]),
			EntityPreparer.dateOrNull(r[Situation.TABLE_NAME + '.' + Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED]),
			EntityPreparer.dateOrNull(r[Situation.TABLE_NAME + '.' + Situation.COLUMN_DATE_SUGGESTION_RESULT_PROCESSED])
		);
	}

	getMatrixProductBySection(section: SectionEnum) {
		var signal = this.signalList.find((signal: Signal) => {
			return signal.Matrix.Section == section;
		});
		return signal ? <MatrixProduct> signal.Matrix : null;
	}
}
