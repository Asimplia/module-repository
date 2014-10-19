
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Product = require('../Entity/Application/Product');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import ProductModel = require('../Definition/Application/ProductModel');

export = ProductLoader;
class ProductLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = ProductModel;
	}

	getById(id: number, callback: (e: Error, product?: Product) => void) {
		this.model.findOne({ "id": id }, (e, object: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, Product.fromObject(object));
		});
	}

	getCount(callback: (e: Error, count?: number) => void): void {
		this.model.count({}, (e, count: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(e, count);
		});
	}

	getMaxDateCreated(callback: (e: Error, maxDateCreated?: Date) => void) {
		this.model.findOne({}).sort({ 'dateCreated': -1 }).exec((e, object: any) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, object.dateCreated);
		});
	}
}
