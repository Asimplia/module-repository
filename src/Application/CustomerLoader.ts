
import mongoose = require('mongoose');
import Customer = require('../Entity/Application/Customer');
import List = require('../Entity/List');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import CustomerModel = require('../Definition/Application/CustomerModel');

export = CustomerLoader;
class CustomerLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = CustomerModel;
	}

	getById(eShopId: number, id: number, callback: (e: Error, customer?: Customer) => void) {
		this.model.findOne({ "id": id, "eShopId": eShopId }, (e, object: mongoose.Document) => {
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

	getCount(eShopId: number, callback: (e: Error, count?: number) => void): void {
		this.model.count({ "eShopId": eShopId }, (e, count: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(e, count);
		});
	}

	searchList(eShopId: number, query: string, filter: { limit?: number; offset?: number }, callback: (e: Error, customerList?: List<Customer>) => void) {
		this.model.find({ "eShopId": eShopId, "lastname": { $regex: query, $options: 'i' } })
		.limit(filter.limit)
		.skip(filter.offset)
		.exec((e: Error, objects: any[]) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, new List<Customer>(objects, Customer.fromObject));
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

	getListByCustomerIds(eShopId: number, ids: number[], callback: (e: Error, customerList?: List<Customer>) => void) {
		this.model.find({ "eShopId": eShopId, "id": { $in: ids } })
		.exec((e: Error, objects: any[]) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, new List<Customer>(objects, Customer.fromObject));
		});
	}
}
