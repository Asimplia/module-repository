
import mongoose = require('mongoose');
import AbstractRecorder = require('../AbstractRecorder');
import Customer = require('../Entity/Application/Customer');
import List = require('../Entity/List');
import CustomerModel = require('../Definition/Application/CustomerModel');

export = CustomerRecorder;
class CustomerRecorder extends AbstractRecorder {
	
	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.model = CustomerModel;
	}

	insertOrUpdateList(customerList: List<Customer>, callback: (e: Error, customerList?: List<Customer>) => void) {
		customerList.createEach().on('item', (customer: Customer, next) => {
			this.insertOrUpdate(customer, next);
		})
		.on('error', (e: Error) => {
			callback(e);
		})
		.on('end', () => {
			callback(null, customerList);
		});
	}

	insertOrUpdate(customer: Customer, callback: (e: Error, customer?: Customer) => void) {
		this.model.findOne({ id: customer.Id, eShopId: customer.EShopId }, (e, doc: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!doc) {
				doc = new this.model({});
				this.getNextId(this.model, (id) => {
					customer.Id = id;
					this.update(doc, Customer.fromObject, customer, callback);
				});
				return;
			}
			this.update(doc, Customer.fromObject, customer, callback);
		});
	}
}
