
import IEntity = require('../IEntity');
import Matrix = require('./Matrix');
import MatrixFactory = require('./MatrixFactory');
import moment = require('moment');

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
		return new Signal(
			parseInt(o[Signal.COLUMN_SIGNAL_ID]), 
			MatrixFactory.createMatrixFromRow(o), 
			moment(o[Signal.COLUMN_DATE_CREATED]).toDate(),
			parseInt(o[Signal.COLUMN_SITUATION_ID])
		);
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

}
