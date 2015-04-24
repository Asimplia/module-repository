
import IEntity = require('../IEntity');
import List = require('../List');
import Signal = require('./Signal');
import MatrixProduct = require('./MatrixProduct');
import MatrixCategory = require('./MatrixCategory');
import MatrixChannel = require('./MatrixChannel');
import MatrixCustomer = require('./MatrixCustomer');
import MatrixChecklist = require('./MatrixChecklist');
import SectionEnum = require('../Section/SectionEnum');
import EntityPreparer = require('../EntityPreparer');
import Util = require('asimplia-util');
import Exception = Util.Error.Exception;
/* tslint:disable */
Util;
/* tslint:enable */

export = Situation;
class Situation implements IEntity {

	public static TABLE_NAME = 'analytical.situation';
	public static COLUMN_SITUATION_ID = 'situationid';
	public static COLUMN_DATE_CREATED = 'datecreated';
	public static COLUMN_DATE_SUGGESTION_RESULT_CREATED = 'datesuggestionresultcreated';
	public static COLUMN_DATE_SUGGESTION_RESULT_PROCESSED = 'datesuggestionresultprocessed';
	public static COLUMN_DATE_CHECKLIST_CREATED = 'datechecklistcreated';
	public static COLUMN_DATE_CHECKLIST_PROCESSED = 'datechecklistprocessed';

	get Id(): number { return this.id; }
	set Id(id: number) { this.id = id; }
	get DateCreated() { return this.dateCreated; }
	get SignalList() { return this.signalList; }
	get DateSuggestionResultCreated() { return this.dateSuggestionResultCreated; }
	set DateSuggestionResultCreated(value: Date) { this.dateSuggestionResultCreated = value; }
	get DateSuggestionResultProcessed() { return this.dateSuggestionResultProcessed; }
	set DateSuggestionResultProcessed(value: Date) { this.dateSuggestionResultProcessed = value; }
	get DateChecklistCreated() { return this.dateChecklistCreated; }
	set DateChecklistCreated(value: Date) { this.dateChecklistCreated = value; }
	get DateChecklistProcessed() { return this.dateChecklistProcessed; }
	set DateChecklistProcessed(value: Date) { this.dateChecklistProcessed = value; }
	get EShopId() {
		return this.signalList.first().Matrix.EShopId;
	}
	get ProductId() {
		if (this.signalList.first().Matrix instanceof MatrixProduct) {
			var productMatrix = <MatrixProduct> this.signalList.first().Matrix;
			return productMatrix.Product.Id;
		}
		if (this.signalList.first().Matrix instanceof MatrixChecklist) {
			var checklistMatrix = <MatrixChecklist> this.signalList.first().Matrix;
			return checklistMatrix.Product.Id;
		}
		return null;
	}
	get CategoryId() {
		if (!(this.signalList.first().Matrix instanceof MatrixCategory)) {
			return null;
		}
		var categoryMatrix = <MatrixCategory> this.signalList.first().Matrix;
		return categoryMatrix.Category.Id;
	}
	get ChannelId() {
		if (!(this.signalList.first().Matrix instanceof MatrixChannel)) {
			return null;
		}
		var channelMatrix = <MatrixChannel> this.signalList.first().Matrix;
		return channelMatrix.Channel.Id;
	}
	get CustomerId() {
		if (!(this.signalList.first().Matrix instanceof MatrixCustomer)) {
			return null;
		}
		var customerMatrix = <MatrixCustomer> this.signalList.first().Matrix;
		return customerMatrix.Customer.Id;
	}
	get OrderId(): number {
		throw new Exception('Not implemented yet order matrixes in situation');
	}

	constructor(
		private id: number,
		private signalList: List<Signal>,
		private dateCreated: Date,
		private dateSuggestionResultCreated: Date,
		private dateSuggestionResultProcessed: Date,
		private dateChecklistCreated: Date,
		private dateChecklistProcessed: Date
	) {	}

	static toObject(entity: Situation) {
		return {
			id: entity.id,
			dateCreated: entity.dateCreated,
			dateSuggestionResultCreated: entity.dateSuggestionResultCreated,
			dateSuggestionResultProcessed: entity.dateSuggestionResultProcessed,
			dateChecklistCreated: entity.dateChecklistCreated,
			dateChecklistProcessed: entity.dateChecklistProcessed,
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
			EntityPreparer.dateOrNull(r[Situation.TABLE_NAME + '.' + Situation.COLUMN_DATE_SUGGESTION_RESULT_PROCESSED]),
			EntityPreparer.dateOrNull(r[Situation.TABLE_NAME + '.' + Situation.COLUMN_DATE_CHECKLIST_CREATED]),
			EntityPreparer.dateOrNull(r[Situation.TABLE_NAME + '.' + Situation.COLUMN_DATE_CHECKLIST_PROCESSED])
		);
	}

	static fromObject(object: any) {
		return new Situation(
			EntityPreparer.intOrNull(object.id),
			new List<Signal>(),
			EntityPreparer.date(object.dateCreated),
			EntityPreparer.dateOrNull(object.dateSuggestionResultCreated),
			EntityPreparer.dateOrNull(object.dateSuggestionResultProcessed),
			EntityPreparer.dateOrNull(object.dateChecklistCreated),
			EntityPreparer.dateOrNull(object.dateChecklistProcessed)
		);
	}

	getMatrixProductBySection(section: SectionEnum) {
		var signal = this.signalList.find((signal: Signal) => {
			return signal.Matrix.Section == section;
		});
		return signal ? <MatrixProduct> signal.Matrix : null;
	}
}
