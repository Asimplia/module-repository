
import mongoose = require('mongoose');
import MatrixLoad = require('../Entity/Application/MatrixLoad');

export = MatrixLoadLoader;
class MatrixLoadLoader {

	static $inject = [
		'Definition.Application.MatrixLoadModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {}

	getById(eShopId: number, id: number, callback: (e: Error, matrixLoad?: MatrixLoad) => void) {
		this.model.findOne({ id: id, eShopId: eShopId }, (e: Error, object: mongoose.Document) => {
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
		this.model.count({ eShopId: eShopId }, (e: Error, count: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(e, count);
		});
	}

	getMaxDateLoaded(callback: (e: Error, maxDateLoaded?: Date) => void) {
		this.model.findOne({}).sort({ dateLoaded: -1 }).exec((e: Error, object: any) => {
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
