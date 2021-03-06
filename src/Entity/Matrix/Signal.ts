﻿
import IEntity = require('../IEntity');
import Matrix = require('./Matrix');
import moment = require('moment');
import EntityPreparer = require('../EntityPreparer');

export = Signal;
class Signal implements IEntity {

	public static TABLE_NAME = 'analytical.signal';
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
			EntityPreparer.intOrNull(o[Signal.TABLE_NAME + '.' + Signal.COLUMN_SIGNAL_ID]),
			Matrix.fromRow(o),
			EntityPreparer.date(o[Signal.TABLE_NAME + '.' + Signal.COLUMN_DATE_CREATED]),
			EntityPreparer.intOrNull(o[Signal.TABLE_NAME + '.' + Signal.COLUMN_SITUATION_ID])
		);
	}

	static fromObject(object: any): Signal {
		return new Signal(
			EntityPreparer.intOrNull(object.id),
			Matrix.fromObject(object),
			EntityPreparer.date(object.dateCreated),
			EntityPreparer.intOrNull(object.situationId)
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
