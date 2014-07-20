
import IEntity = require('../IEntity');
import Matrix = require('./Matrix');
import MatrixProduct = require('./MatrixProduct');
import SectionProvider = require('../../Entity/Section/SectionProvider');

export = Signal;
class Signal implements IEntity {

	public static TABLE_NAME = 'signal';
	public static COLUMN_SIGNAL_ID = 'signalid';
	public static COLUMN_MATRIX_ID = 'matrixid';
	public static COLUMN_DATE_CREATED = 'datecreated';

	get Id(): number { return this.id; }
	set Id(value: number) { this.id = value; }
	get Matrix(): Matrix { return this.matrix; }
	get DateCreated(): Date { return this.dateCreated; }

	constructor(
		private id: number,
		private matrix: Matrix,
		private dateCreated: Date
		) { }

	static fromRow(o: any): Signal {
		var matrix = this.createMatrixFromRow(o);
		return new Signal(o[Signal.COLUMN_SIGNAL_ID], matrix, o[Signal.COLUMN_DATE_CREATED]);
	}

	static createMatrixFromRow(row: any): Matrix {
		var section = SectionProvider.createSectionEnum(row[Matrix.COLUMN_TYPE]);
		var matrix;
		if (SectionProvider.isProduct(section)) {
			matrix = MatrixProduct.fromRow(row);
		} else
		if (SectionProvider.isCustomer(section)) {
			matrix = MatrixProduct.fromRow(row); // TODO
		} else
		if (SectionProvider.isChannel(section)) {
			matrix = MatrixProduct.fromRow(row); // TODO
		} else {
			throw new Error('Not implemented');
		}
		return matrix;
	}

	static toObject(entity: Signal): any {

	}

	toObject(): any {
		return Signal.toObject(this);
	}

}
