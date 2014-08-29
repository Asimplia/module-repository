
/// <reference path="../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import AbstractRecorder = require('../AbstractRecorder');
import EShop = require('../Entity/Application/EShop');

export = EShopRecorder;
class EShopRecorder extends AbstractRecorder {
	
	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.model = require('./EShopModel');
	}

	insertOrUpdate(eShop: EShop, callback: (e: Error, eShop?: EShop) => void) {
		this.model.findOne({ id: eShop.Id }, (e, eShopDocument: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!eShopDocument) {
				eShopDocument = new this.model({});
				this.getNextId(this.model, (id) => {
					eShop.Id = id;
					this.update(eShopDocument, EShop.fromObject, eShop, callback);
				});
				return;
			}
			this.update(eShopDocument, EShop.fromObject, eShop, callback);
		});
	}
}
