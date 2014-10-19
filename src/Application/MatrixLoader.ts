
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Matrix = require('../Entity/Application/Matrix');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import MatrixModel = require('../Definition/Application/MatrixModel');
import List = require('../Entity/List');

export = MatrixLoader;
class MatrixLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = MatrixModel;
	}

	getListLastByProductId(eShopId: number, productId: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		this.model.findOne({ "eShopId": eShopId, "productId": productId }, null, { sortBy: "-loadId" }, (e, maxMatrix: any) => {
			if (e) {
				callback(e);
				return;
			}
			if (!maxMatrix) {
				callback(null, new List<Matrix>());
				return;
			}
			var maxLoadId = maxMatrix.loadId;
			this.model.find({ "eShopId": eShopId, "productId": productId, "loadId": maxLoadId }, (e, objects: any[]) => {
				if (e) {
					callback(e);
					return;
				}
				var matrixList = new List<Matrix>(objects, Matrix.fromObject);
				callback(null, matrixList);
			});
		});
	}

	getMaxDateValid(callback: (e: Error, maxDateValid?: Date) => void) {
		this.model.findOne({}).sort({ 'dateValid': -1 }).exec((e, object: any) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, object.dateValid);
		});
	}
}
