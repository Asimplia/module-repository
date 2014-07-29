
import IEntity = require('../IEntity');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import Product = require('../EShop/Product');
import moment = require('moment');
import MatrixProduct = require('./MatrixProduct')
import MatrixCustomer = require('./MatrixCustomer')
import MatrixChannel = require('./MatrixChannel')
import SectionEnum = require('../Section/SectionEnum');

export = Matrix;
class Matrix implements IEntity {

	public static TABLE_NAME = 'matrix';
	public static COLUMN_MATRIX_ID = 'matrixid';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_SECTION = 'matrixtype';
	public static COLUMN_LOAD_ID = 'loadid';
	public static COLUMN_SCORE_ABSOLUTE = 'matrixscoreabs';
	public static COLUMN_SCORE_RELATIVE = 'matrixscorerel';
	public static COLUMN_SCORE_WEIGHT = 'matrixscorewei';
	public static COLUMN_CHANGE_ABSOLUTE = 'matrixchangeabs';
	public static COLUMN_CHANGE_RELATIVE = 'matrixchangerel';
	public static COLUMN_CHANGE_WEIGHT = 'matrixchangewei';
	public static COLUMN_PREDICTION = 'matrixprediction';
	public static COLUMN_QUADRANT = 'matrixquadrant';
	public static COLUMN_DATE_VALID = 'datevalid';
	public static COLUMN_INPUT_VALUE_X = 'inputvaluex';
	public static COLUMN_INPUT_VALUE_Y = 'inputvaluey';
	public static COLUMN_CHANGE_VALUE_X = 'changevaluex';
	public static COLUMN_CHANGE_VALUE_Y = 'changevaluey';
	public static COLUMN_TANGENS = 'tan';
	public static COLUMN_CHANGE_TANGENS = 'changeTan';
	public static COLUMN_PRODUCT_ID = 'productid';
	public static COLUMN_CUSTOMER_ID = 'customerid';
	public static COLUMN_CHANNEL_ID = 'channelid';
	public static COLUMN_ORDER_ID = 'orderid';

	get Id(): number { return this.id; }
	get EShopId(): number { return this.eShopId; }
	get LoadId(): number { return this.loadId; }
	get Section(): SectionEnum { return this.section; }
	set Section(value: SectionEnum) { this.section = value; }
	get Quadrant(): QuadrantValueEnum { return this.quadrant; }
	get ChangeAbsolute(): number { return this.changeAbsolute; }
	get ChangeRelative(): number { return this.changeRelative; }
	get ChangeWeight(): number { return this.changeWeight; }
	get ScoreAbsolute(): number { return this.scoreAbsolute; }
	get ScoreRelative(): number { return this.scoreRelative; }
	get ScoreWeight(): number { return this.scoreWeight; }
	get Prediction(): number { return this.prediction; }
	get InputValueX(): number { return this.inputValueX; }
	get InputValueY(): number { return this.inputValueY; }
	get ChangeValueX(): number { return this.changeValueX; }
	get ChangeValueY(): number { return this.changeValueY; }
	get Tangens(): number { return this.tangens; }
	get ChangeTangens(): number { return this.changeTangens; }

	constructor(
		private id: number,
		private eShopId: number,
		private section: SectionEnum,
		private loadId: number,
		private scoreAbsolute: number,
		private scoreRelative: number,
		private scoreWeight: number,
		private changeAbsolute: number,
		private changeRelative: number,
		private changeWeight: number,
		private prediction: number,
		private quadrant: QuadrantValueEnum,
		private dateValid: Date,
		private inputValueX: number,
		private inputValueY: number,
		private changeValueX: number,
		private changeValueY: number,
		private tangens: number,
		private changeTangens: number
	) {	}

	static toObject(entity: Matrix): any {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			section: entity.section,
			loadId: entity.loadId,
			scoreAbsolute: entity.scoreAbsolute,
			scoreRelative: entity.scoreRelative,
			scoreWeight: entity.scoreWeight,
			changeAbsolute: entity.changeAbsolute,
			changeRelative: entity.changeRelative,
			changeWeight: entity.scoreWeight,
			prediction: entity.prediction,
			quadrant: QuadrantValueEnum[entity.quadrant],
			dateValid: entity.dateValid ? moment(entity.dateValid).format('YYYY-MM-DD HH:mm:ss') : null,
			inputValueX: entity.inputValueX,
			inputValueY: entity.inputValueY,
			changeValueX: entity.changeValueX,
			changeValueY: entity.changeValueY,
			tangens: entity.tangens,
			changeTangens: entity.changeTangens
		};
	}

	toObject(): any {
		return Matrix.toObject(this);
	}

	getChange() {
		return this.changeWeight;
	}

	isCorresponding(matrix: Matrix): boolean {
		throw new Error('Implement this abstract method');
	}
}
