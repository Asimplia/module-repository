
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Customer = require('../Entity/Application/Customer');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import CustomerModel = require('../Definition/Application/CustomerModel');

export = CustomerLoader;
class CustomerLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = CustomerModel;
	}

	getById(id: number, callback: (e: Error, customer?: Customer) => void) {
		this.model.findOne({ "id": id }, (e, object: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, Customer.fromObject(object));
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
