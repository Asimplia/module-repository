
import IEntity = require('../IEntity');
import Matrix = require('./Matrix');
import moment = require('moment');
import EShop = require('../EShop/EShop');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import QuadrantValueFactory = require('./QuadrantValueFactory');
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');
import EntityPreparer = require('../EntityPreparer');

export = MatrixEShop;
class MatrixEShop extends Matrix {

	get EShop(): EShop { return this.eShop; }

	constructor(
		id: number,
		eShopId: number,
		section: SectionEnum,
		loadId: number,
		scoreAbsolute: number,
		scoreRelative: number,
		scoreWeight: number,
		changeAbsolute: number,
		changeRelative: number,
		changeWeight: number,
		prediction: number,
		quadrant: QuadrantValueEnum,
		dateValid: Date,
		inputValueX: number,
		inputValueY: number,
		changeValueX: number,
		changeValueY: number,
		tangens: number,
		changeTangens: number,
		private eShop: EShop
	) {
		super(
			id, eShopId, section, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight,
			prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens,
			null, null, null, null
		);
	}

	static toObject(e: MatrixEShop): any {
		var o = Matrix.toObject(e);
		o.eShop = e.eShop.toObject();
		return o;
	}

	toObject() {
		return MatrixEShop.toObject(this);
	}

	static fromRow(o: any): MatrixEShop {
		return new MatrixEShop(
			EntityPreparer.intOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_MATRIX_ID]),
			EntityPreparer.int(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID]),
			SectionFactory.createSectionEnum(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SECTION]),
			EntityPreparer.int(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID]),
			EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SCORE_ABSOLUTE]),
			EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SCORE_RELATIVE]),
			EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SCORE_WEIGHT]),
			EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_ABSOLUTE]),
			EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_RELATIVE]),
			EntityPreparer.float(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_WEIGHT]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_PREDICTION]),
			QuadrantValueFactory.createQuadrantValueEnum(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_QUADRANT]),
			EntityPreparer.date(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_DATE_VALID]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_INPUT_VALUE_X]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_INPUT_VALUE_Y]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_VALUE_X]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_VALUE_Y]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_TANGENS]),
			EntityPreparer.floatOrNull(o[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANGE_TANGENS]),
			EShop.fromRow(o)
		);
	}

	isCorresponding(matrix: Matrix) {
		if (matrix instanceof MatrixEShop) {
			return this.eShop.Id == (<MatrixEShop> matrix).EShop.Id;
		}
		return false;
	}

}
