
import IEntity = require('../IEntity');
import Matrix = require('./Matrix');
import moment = require('moment');
import Product = require('../EShop/Product');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import QuadrantValueFactory = require('./QuadrantValueFactory');
import SectionEnum = require('../Section/SectionEnum');
import SectionFactory = require('../Section/SectionFactory');

export = MatrixProduct;
class MatrixProduct extends Matrix {

	get Product(): Product { return this.product; }

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
		private product: Product
	) {
		super(
			id, eShopId, section, loadId, scoreAbsolute, scoreRelative, scoreWeight, changeAbsolute, changeRelative, changeWeight,
			prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens
		);
	}

	static toObject(e: MatrixProduct): any {
		var o = Matrix.toObject(e);
		o.product = e.product.toObject();
		return o;
	}

	toObject() {
		return MatrixProduct.toObject(this);
	}

	static fromRow(o: any): MatrixProduct {
		return new MatrixProduct(
			o[Matrix.COLUMN_MATRIX_ID],
			o[Matrix.COLUMN_E_SHOP_ID],
			SectionFactory.createSectionEnum(o[Matrix.COLUMN_SECTION]),
			o[Matrix.COLUMN_LOAD_ID],
			o[Matrix.COLUMN_SCORE_ABSOLUTE],
			o[Matrix.COLUMN_SCORE_RELATIVE],
			o[Matrix.COLUMN_SCORE_WEIGHT],
			o[Matrix.COLUMN_CHANGE_ABSOLUTE],
			o[Matrix.COLUMN_CHANGE_RELATIVE],
			o[Matrix.COLUMN_CHANGE_WEIGHT],
			o[Matrix.COLUMN_PREDICTION],
			QuadrantValueFactory.createQuadrantValueEnum(o[Matrix.COLUMN_QUADRANT]),
			moment(o[Matrix.COLUMN_DATE_VALID]).toDate(),
			o[Matrix.COLUMN_INPUT_VALUE_X],
			o[Matrix.COLUMN_INPUT_VALUE_Y],
			o[Matrix.COLUMN_CHANGE_VALUE_X],
			o[Matrix.COLUMN_CHANGE_VALUE_Y],
			o[Matrix.COLUMN_TANGENS],
			o[Matrix.COLUMN_CHANGE_TANGENS],
			new Product(o[Matrix.COLUMN_PRODUCT_ID], o[Matrix.COLUMN_E_SHOP_ID], null, null, null)
		);
	}

	isCorresponding(matrix: Matrix) {
		if (matrix instanceof MatrixProduct) {
			return this.Product.Id == (<MatrixProduct> matrix).Product.Id;
		}
		return false;
	}
}
