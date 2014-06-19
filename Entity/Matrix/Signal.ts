
import IEntity = require('../IEntity');
import Record = require('./Record');
import MatrixProduct = require('./MatrixProduct');

export = Signal;
class Signal implements IEntity {

	get Id(): number { return this.id; }
	set Id(value: number) { this.id = value; }
	get Record(): Record { return this.record; }
	get DateCreated(): Date { return this.dateCreated; }

	constructor(
		private id: number,
		private record: Record,
		private dateCreated: Date
		) { }

	static fromRow(o: any): Signal {
		return new Signal(o.SignalID, Signal.createRecordFromRow(o), o.DateCreated);
	}

	static toObject(entity: Signal): any {

	}

	toObject(): any {
		return Signal.toObject(this);
	}

	static createRecordFromRow(o: any): Record {
		switch (o.MatrixType) {
			case 'MP1':
				return MatrixProduct.fromRow(o);
			default:
				throw new Error('Not implemented');
		}
	}
}
