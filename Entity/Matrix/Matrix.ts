
import IEntity = require('../IEntity');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import Product = require('../EShop/Product');

export = Matrix;
class Matrix implements IEntity {

	public static TABLE_NAME = 'matrix';
	public static COLUMN_MATRIX_ID = 'matrixid';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_TYPE = 'matrixtype';
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
	get Type(): string { return this.type; }
	set Type(value: string) { this.type = value; }
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
		private type: string,
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
			type: entity.type
			// TODO
		};
	}

	toObject(): any {
		return Matrix.toObject(this);
	}

	getChange() {
		return this.changeWeight;
	}

}
