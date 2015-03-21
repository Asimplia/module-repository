
import mongoose = require('mongoose');
import Company = require('../Entity/Application/Company');

export = CompanyLoader;
class CompanyLoader {

	static $inject = [
		'Definition.Application.CompanyModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {}

	getById(id: number, callback: (e: Error, company?: Company) => void) {
		this.model.findOne({ id: id }, (e: Error, object: mongoose.Document) => {
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
		this.model.count({}, (e: Error, count: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(e, count);
		});
	}

	getMaxDateCreated(callback: (e: Error, maxDateCreated?: Date) => void) {
		this.model.findOne({}).sort({ dateCreated: -1 }).exec((e: Error, object: any) => {
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
