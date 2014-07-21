
import IEntity = require('../IEntity');
import Matrix = require('./Matrix');
import MatrixFactory = require('./MatrixFactory');
import moment = require('moment');
import MatrixProduct = require('./MatrixProduct')
import MatrixCustomer = require('./MatrixCustomer')
import MatrixChannel = require('./MatrixChannel')

export = Signal;
class Signal implements IEntity {

	public static TABLE_NAME = 'signal';
	public static COLUMN_SIGNAL_ID = 'signalid';
	public static COLUMN_MATRIX_ID = 'matrixid';
	public static COLUMN_DATE_CREATED = 'datecreated';
	public static COLUMN_SITUATION_ID = 'situationid';

	get Id(): number { return this.id; }
	set Id(value: number) { this.id = value; }
	get Matrix(): Matrix { return this.matrix; }
	get DateCreated(): Date { return this.dateCreated; }
	get SituationId(): number { return this.situationId; }
	set SituationId(value: number) { this.situationId = value; }

	constructor(
		private id: number,
		private matrix: Matrix,
		private dateCreated: Date,
		private situationId: number
		) { }

	static fromRow(o: any): Signal {
		var matrix = MatrixFactory.createMatrixFromRow(o);
		return new Signal(o[Signal.COLUMN_SIGNAL_ID], matrix, o[Signal.COLUMN_DATE_CREATED], o[Signal.COLUMN_SITUATION_ID]);
	}

	static toObject(entity: Signal): any {
		return {
			id: entity.id,
			matrix: entity.Matrix.toObject(),
			dateCreated: moment(entity.dateCreated).format('YYYY-MM-DD HH:mm:ss'),
			situationId: entity.situationId
		};
	}

	toObject(): any {
		return Signal.toObject(this);
	}

	isCorresponding(signal: Signal) {
		if (this.Matrix instanceof MatrixProduct && signal.Matrix instanceof MatrixProduct) {
			return (<MatrixProduct> this.Matrix).Product.Id == (<MatrixProduct> signal.Matrix).Product.Id;
		}
		if (this.Matrix instanceof MatrixCustomer && signal.Matrix instanceof MatrixCustomer) {
			return (<MatrixCustomer> this.Matrix).Customer.Id == (<MatrixCustomer> signal.Matrix).Customer.Id;
		}
		if (this.Matrix instanceof MatrixChannel && signal.Matrix instanceof MatrixChannel) {
			return (<MatrixChannel> this.Matrix).Channel.Id == (<MatrixChannel> signal.Matrix).Channel.Id;
		}
		return false;
	}
}
