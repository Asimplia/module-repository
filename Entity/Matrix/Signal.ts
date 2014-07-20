﻿
import IEntity = require('../IEntity');
import Matrix = require('./Matrix');
import MatrixFactory = require('./MatrixFactory');

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

	}

	toObject(): any {
		return Signal.toObject(this);
	}

}
