
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Company = require('../Entity/Application/Company');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import CompanyModel = require('../Definition/Application/CompanyModel');

export = CompanyLoader;
class CompanyLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = CompanyModel;
	}

	getById(id: number, callback: (e: Error, company?: Company) => void) {
		this.model.findOne({ "id": id }, (e, object: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, Company.fromObject(object));
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
