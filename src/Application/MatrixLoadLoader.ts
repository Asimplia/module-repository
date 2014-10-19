
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import MatrixLoad = require('../Entity/Application/MatrixLoad');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import MatrixLoadModel = require('../Definition/Application/MatrixLoadModel');

export = MatrixLoadLoader;
class MatrixLoadLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = MatrixLoadModel;
	}

	getById(eShopId: number, id: number, callback: (e: Error, matrixLoad?: MatrixLoad) => void) {
		this.model.findOne({ "id": id, "eShopId": eShopId }, (e, object: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, MatrixLoad.fromObject(object));
		});
	}

	getCount(eShopId: number, callback: (e: Error, count?: number) => void): void {
		this.model.count({ "eShopId": eShopId }, (e, count: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(e, count);
		});
	}

	getMaxDateLoaded(callback: (e: Error, maxDateLoaded?: Date) => void) {
		this.model.findOne({}).sort({ 'dateLoaded': -1 }).exec((e, object: any) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, object.dateLoaded);
		});
	}
}
