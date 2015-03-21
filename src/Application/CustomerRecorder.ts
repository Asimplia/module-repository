
import mongoose = require('mongoose');
import Customer = require('../Entity/Application/Customer');
import List = require('../Entity/List');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = CustomerRecorder;
class CustomerRecorder {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Application.CustomerModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, Customer);
	}

	insertOrUpdateList(customerList: List<Customer>, callback: (e: Error, customerList?: List<Customer>) => void) {
		this.documentExecutor.insertOrUpdateList(customerList, callback);
	}

	insertOrUpdate(customer: Customer, callback: (e: Error, company?: Customer) => void) {
		this.documentExecutor.insertOrUpdate(customer, callback);
	}
}
