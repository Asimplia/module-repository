
import IEntity = require('../IEntity');
import Record = require('./Record');
import moment = require('moment');
import Product = require('../EShop/Product');
import QuadrantValueEnum = require('./QuadrantValueEnum');

export = MatrixProduct;
class MatrixProduct extends Record {

	constructor(
		id: number,
		type: string,
		description: string,
		private product: Product,
		scoreAbsolute: number,
		scoreRelative: number,
		scoreWeight: number,
		changeAbsolute: number,
		changeRelative: number,
		changeWeight: number,
		prediction: number,
		group: number,
		quadrant: QuadrantValueEnum,
		dateValid: Date,
		inputValueX: number,
		inputValueY: number,
		changeValueX: number,
		changeValueY: number,
		tangens: number,
		changeTangens: number
		) {
		super(
			id, type, description, scoreAbsolute, scoreRelative,
			scoreWeight, changeAbsolute, changeRelative, changeWeight,
			prediction, group, quadrant, dateValid,
			inputValueX, inputValueY, changeValueX, changeValueY,
			tangens, changeTangens
			);
	}
	
	static fromRow(o: any): MatrixProduct {
		return new MatrixProduct(
			o.MatrixID,
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
			Record.createQuadrantValueEnum(o.MatrixQuadrant),
			moment(o.DateValid).toDate(),
			o.InputValueX,
			o.InputValueY,
			o.ChangeValueX,
			o.ChangeValueY,
			o.Tan,
			o.ChangeTan
			);
	}

	static toObject(entity: MatrixProduct): any {
		return {
			type: entity.Type,
			description: entity.Description,
			product: entity.product.toObject()
			/*scoreAbsolute: entity.scoreAbsolute,
			scoreRelative: entity.scoreRelative,
			scoreWeight: entity.scoreWeight,
			changeAbsolute: entity.changeAbsolute,
			changeRelative: entity.changeRelative,
			changeWeight: entity.changeWeight,
			prediction: entity.prediction,
			dateValid: moment(entity.dateValid).format()*/
		};
	}

	toObject(): any {
		return MatrixProduct.toObject(this);
	}

}
