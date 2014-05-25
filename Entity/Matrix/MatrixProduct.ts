
import IEntity = require('../IEntity');
import Record = require('./Record');
import moment = require('moment');
import Product = require('../EShop/Product');

export = MatrixProduct;
class MatrixProduct extends Record implements IEntity {

	constructor(
		type: string,
		description: string,
		private product: Product,
		private scoreAbsolute: number,
		private scoreRelative: number,
		private scoreWeight: number,
		private changeAbsolute: number,
		private changeRelative: number,
		private changeWeight: number,
		private prediction: number,
		private group: number,
		private dateValid: Date
		) {
		super(type, description);
	}

	static fromRow(o: any): MatrixProduct {
		return new MatrixProduct(
			o.MatrixType,
			o.Description,
			new Product(o.ProductID, o.EShopID, o.ProductName, o.FixPrice, o.FlagInShop),
			o.MatrixScoreAbs,
			o.MatrixScoreRel,
			o.MatrixScoreWei,
			o.MatrixChangeAbs,
			o.MatrixChangeRel,
			o.MatrixChangeWei,
			o.MatrixPrediction,
			o.MatrixGroup,
			moment(o.DateValid).toDate()
			);
	}

	static toObject(entity: MatrixProduct): any {
		return {
			type: entity.Type,
			description: entity.Description,
			product: entity.product.toObject(),
			scoreAbsolute: entity.scoreAbsolute,
			scoreRelative: entity.scoreRelative,
			scoreWeight: entity.scoreWeight,
			changeAbsolute: entity.changeAbsolute,
			changeRelative: entity.changeRelative,
			changeWeight: entity.changeWeight,
			prediction: entity.prediction,
			dateValid: moment(entity.dateValid).format()
		};
	}

	toObject(): any {
		return MatrixProduct.toObject(this);
	}
}
