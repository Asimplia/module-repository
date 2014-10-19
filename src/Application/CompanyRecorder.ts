
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import AbstractRecorder = require('../AbstractRecorder');
import Company = require('../Entity/Application/Company');
import List = require('../Entity/List');
import CompanyModel = require('../Definition/Application/CompanyModel');

export = CompanyRecorder;
class CompanyRecorder extends AbstractRecorder {
	
	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.model = CompanyModel;
	}

	insertOrUpdateList(companyList: List<Company>, callback: (e: Error, companyList?: List<Company>) => void) {
		companyList.createEach().on('item', (company: Company, next) => {
			this.insertOrUpdate(company, next);
		})
		.on('error', (e: Error) => {
			callback(e);
		})
		.on('end', () => {
			callback(null, companyList);
		});
	}

	insertOrUpdate(company: Company, callback: (e: Error, company?: Company) => void) {
		this.model.findOne({ id: company.Id }, (e, doc: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!doc) {
				doc = new this.model({});
				this.getNextId(this.model, (id) => {
					company.Id = id;
					this.update(doc, Company.fromObject, company, callback);
				});
				return;
			}
			this.update(doc, Company.fromObject, company, callback);
		});
	}
}
