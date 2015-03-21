
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');
import SectionEnum = require('./SectionEnum');
import SectionFactory = require('./SectionFactory');

export = MatrixType;
class MatrixType implements IEntity {

	public static TABLE_NAME = 'analytical.cmatrix';
	public static COLUMN_SECTION = 'matrixtype';
	public static COLUMN_DESCRIPTION = 'description';
	public static COLUMN_DATE_CREATED = 'datecreated';

	get Section(): SectionEnum { return this.section; }
	get Description(): string { return this.description; }
	get DateCreated(): Date { return this.dateCreated; }

	constructor(
		private section: SectionEnum,
		private description: string,
		private dateCreated: Date
	) {}

	static toObject(e: MatrixType) {
		return {
			section: SectionEnum[e.section],
			description: e.description,
			dateCreated: e.dateCreated
		};
	}

	toObject() {
		return MatrixType.toObject(this);
	}

	static fromObject(o: any) {
		return new MatrixType(
			SectionFactory.createSectionEnum(o.section),
			EntityPreparer.stringOrNull(o.description),
			EntityPreparer.date(o.dateCreated)
		);
	}

	static fromRow(r: any) {
		return new MatrixType(
			SectionFactory.createSectionEnum(r[MatrixType.TABLE_NAME + '.' + MatrixType.COLUMN_SECTION]),
			EntityPreparer.stringOrNull(r[MatrixType.TABLE_NAME + '.' + MatrixType.COLUMN_DESCRIPTION]),
			EntityPreparer.date(r[MatrixType.TABLE_NAME + '.' + MatrixType.COLUMN_DATE_CREATED])
		);
	}
}
