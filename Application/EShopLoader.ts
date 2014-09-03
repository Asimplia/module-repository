
/// <reference path="../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import EShop = require('../Entity/Application/EShop');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import EShopModel = require('./EShopModel');

export = EShopLoader;
class EShopLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = EShopModel;
	}

	getById(id: number, callback: (e: Error, eShop?: EShop) => void) {
		this.model.findOne({ "id": id }, (e, object: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, EShop.fromObject(object));
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
}
