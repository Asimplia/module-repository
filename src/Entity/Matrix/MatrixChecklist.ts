
import Matrix = require('./Matrix');
import Product = require('../EShop/Product');
import QuadrantValueEnum = require('./QuadrantValueEnum');
import SectionEnum = require('../Section/SectionEnum');

export = MatrixChecklist;
class MatrixChecklist extends Matrix {

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
			prediction, quadrant, dateValid, inputValueX, inputValueY, changeValueX, changeValueY, tangens, changeTangens,
			product.Id, null, null, null
		);
	}

	static toObject(e: MatrixChecklist): any {
		var o = Matrix.toObject(e);
		o.product = e.product.toObject();
		return o;
	}

	toObject() {
		return MatrixChecklist.toObject(this);
	}

	isCorresponding(matrix: Matrix) {
		if (matrix instanceof MatrixChecklist) {
			return this.Product.Id == (<MatrixChecklist> matrix).Product.Id;
		}
		return false;
	}
}
