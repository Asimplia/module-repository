﻿
import IEntity = require('../IEntity');
import Matrix = require('./Matrix');
import moment = require('moment');
import Customer = require('../EShop/Customer');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import QuadrantValueFactory = require('./QuadrantValueFactory');
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');
import EntityPreparer = require('../EntityPreparer');

export = MatrixCustomer;
class MatrixCustomer extends Matrix {

	get Customer(): Customer { return this.customer; }

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
		private customer: Customer
	) {
		super(
			id, eShopId, section, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight,
			prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens
		);
	}

	static toObject(e: MatrixCustomer): any {
		var o = Matrix.toObject(e);
		o.customer = e.customer.toObject();
		return o;
	}

	toObject() {
		return MatrixCustomer.toObject(this);
	}

	static fromRow(o: any): MatrixCustomer {
		return new MatrixCustomer(
			EntityPreparer.intOrNull(o[Matrix.COLUMN_MATRIX_ID]),
			EntityPreparer.int(o[Matrix.COLUMN_E_SHOP_ID]),
			SectionFactory.createSectionEnum(o[Matrix.COLUMN_SECTION]),
			EntityPreparer.int(o[Matrix.COLUMN_LOAD_ID]),
			EntityPreparer.float(o[Matrix.COLUMN_SCORE_ABSOLUTE]),
			EntityPreparer.float(o[Matrix.COLUMN_SCORE_RELATIVE]),
			EntityPreparer.float(o[Matrix.COLUMN_SCORE_WEIGHT]),
			EntityPreparer.float(o[Matrix.COLUMN_CHANGE_ABSOLUTE]),
			EntityPreparer.float(o[Matrix.COLUMN_CHANGE_RELATIVE]),
			EntityPreparer.float(o[Matrix.COLUMN_CHANGE_WEIGHT]),
			EntityPreparer.floatOrNull(o[Matrix.COLUMN_PREDICTION]),
			QuadrantValueFactory.createQuadrantValueEnum(o[Matrix.COLUMN_QUADRANT]),
			EntityPreparer.date(o[Matrix.COLUMN_DATE_VALID]),
			EntityPreparer.floatOrNull(o[Matrix.COLUMN_INPUT_VALUE_X]),
			EntityPreparer.floatOrNull(o[Matrix.COLUMN_INPUT_VALUE_Y]),
			EntityPreparer.floatOrNull(o[Matrix.COLUMN_CHANGE_VALUE_X]),
			EntityPreparer.floatOrNull(o[Matrix.COLUMN_CHANGE_VALUE_Y]),
			EntityPreparer.floatOrNull(o[Matrix.COLUMN_TANGENS]),
			EntityPreparer.floatOrNull(o[Matrix.COLUMN_CHANGE_TANGENS]),
			Customer.fromRow(o)
		);
	}

	isCorresponding(matrix: Matrix) {
		if (matrix instanceof MatrixCustomer) {
			return this.Customer.Id == (<MatrixCustomer> matrix).Customer.Id;
		}
		return false;
	}

}
