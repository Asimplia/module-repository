﻿
import IEntity = require('../IEntity');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import moment = require('moment');
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');
import QuadrantValueFactory = require('./QuadrantValueFactory');
import EntityPreparer = require('../EntityPreparer');
// TODO workaround cyclic require dependency using require('./MatrixFactory'); hard in code fromRow()
// import MatrixFactory = require('./MatrixFactory');

export = Matrix;
class Matrix implements IEntity {

	public static TABLE_NAME = 'analytical.matrix';
	public static COLUMN_MATRIX_ID = 'matrixid';
	public static COLUMN_E_SHOP_ID = 'eshopid';
	public static COLUMN_SECTION = 'matrixtype';
	public static COLUMN_LOAD_ID = 'loadid';
	public static COLUMN_SCORE_ABSOLUTE = 'scoreabs';
	public static COLUMN_SCORE_RELATIVE = 'scorerel';
	public static COLUMN_SCORE_WEIGHT = 'scorewei';
	public static COLUMN_CHANGE_ABSOLUTE = 'changeabs';
	public static COLUMN_CHANGE_RELATIVE = 'changerel';
	public static COLUMN_CHANGE_WEIGHT = 'changewei';
	public static COLUMN_PREDICTION = 'prediction';
	public static COLUMN_QUADRANT = 'quadrant';
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
	public static COLUMN_CATEGORY_ID = 'productcategoryid';

	get Id(): number { return this.id; }
	get EShopId(): number { return this.eShopId; }
	get LoadId(): number { return this.loadId; }
	get Section(): SectionEnum { return this.section; }
	set Section(value: SectionEnum) { this.section = value; }
	get Quadrant(): QuadrantValueEnum { return this.quadrant; }
	get DateValid(): Date { return this.dateValid; }
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
	get ProductId(): number { return this.productId; }
	get CustomerId(): number { return this.customerId; }
	get ChannelId(): number { return this.channelId; }
	get CategoryId(): number { return this.categoryId; }
	get EntityId(): number {
		switch (true) {
			case SectionFactory.isProduct(this.section):
				return this.productId;
			case SectionFactory.isCustomer(this.section):
				return this.customerId;
			case SectionFactory.isChannel(this.section):
				return this.channelId;
			case SectionFactory.isCategory(this.section):
				return this.categoryId;
		}
		throw new Error('Not supported section ' + this.section);
	}

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
		private changeTangens: number,
		private productId: number,
		private customerId: number,
		private channelId: number,
		private categoryId: number
	) {	}

	static toObject(entity: Matrix): any {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			section: SectionEnum[entity.section],
			loadId: entity.loadId,
			scoreAbsolute: entity.scoreAbsolute,
			scoreRelative: entity.scoreRelative,
			scoreWeight: entity.scoreWeight,
			changeAbsolute: entity.changeAbsolute,
			changeRelative: entity.changeRelative,
			changeWeight: entity.changeWeight,
			prediction: entity.prediction,
			quadrant: QuadrantValueEnum[entity.quadrant],
			dateValid: entity.dateValid ? moment(entity.dateValid).toDate() : null,
			inputValueX: entity.inputValueX,
			inputValueY: entity.inputValueY,
			changeValueX: entity.changeValueX,
			changeValueY: entity.changeValueY,
			tangens: entity.tangens,
			changeTangens: entity.changeTangens,
			productId: entity.productId,
			customerId: entity.customerId,
			channelId: entity.channelId,
			categoryId: entity.categoryId
		};
	}

	static fromObject(object: any) {
		return new Matrix(
			EntityPreparer.intOrNull(object.id),
			EntityPreparer.int(object.eShopId),
			SectionFactory.createSectionEnum(object.section),
			EntityPreparer.int(object.loadId),
			EntityPreparer.floatOrNull(object.scoreAbsolute),
			EntityPreparer.floatOrNull(object.scoreRelative),
			EntityPreparer.floatOrNull(object.scoreWeight),
			EntityPreparer.floatOrNull(object.changeAbsolute),
			EntityPreparer.floatOrNull(object.changeRelative),
			EntityPreparer.floatOrNull(object.changeWeight),
			EntityPreparer.floatOrNull(object.prediction),
			QuadrantValueFactory.createQuadrantValueEnum(object.quadrant),
			EntityPreparer.date(object.dateValid),
			EntityPreparer.floatOrNull(object.inputValueX),
			EntityPreparer.floatOrNull(object.inputValueY),
			EntityPreparer.floatOrNull(object.changeValueX),
			EntityPreparer.floatOrNull(object.changeValueY),
			EntityPreparer.floatOrNull(object.tangens),
			EntityPreparer.floatOrNull(object.changeTangens),
			EntityPreparer.intOrNull(object.productId),
			EntityPreparer.intOrNull(object.customerId),
			EntityPreparer.intOrNull(object.channelId),
			EntityPreparer.intOrNull(object.categoryId)
		);
	}

	static fromRow(row: any): Matrix {
		return /*MatrixFactory*/require('./MatrixFactory').createMatrixFromRow(row);
	}

	toObject(): any {
		return Matrix.toObject(this);
	}

	isCorresponding(matrix: Matrix): boolean {
		throw new Error('Implement this abstract method');
	}
}
