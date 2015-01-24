
import mongoose = require('mongoose');
import Company = require('../Entity/Application/Company');
import List = require('../Entity/List');
import CompanyModel = require('../Definition/Application/CompanyModel');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = CompanyRecorder;
class CompanyRecorder {
	
	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Application.CompanyModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, Company);
	}

	insertOrUpdateList(companyList: List<Company>, callback: (e: Error, companyList?: List<Company>) => void) {
		this.documentExecutor.insertOrUpdateList(companyList, callback);
	}

	insertOrUpdate(company: Company, callback: (e: Error, company?: Company) => void) {
		this.documentExecutor.insertOrUpdate(company, callback);
	}
}
