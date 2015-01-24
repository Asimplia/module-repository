
import mongoose = require('mongoose');
import Product = require('../Entity/Application/Product');
import List = require('../Entity/List');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import ProductModel = require('../Definition/Application/ProductModel');

export = ProductLoader;
class ProductLoader {

	static $inject = [
		'Definition.Application.ProductModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {}

	getById(eShopId: number, id: number, callback: (e: Error, product?: Product) => void) {
		this.model.findOne({ "id": id, "eShopId": eShopId }, (e, object: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, Product.fromObject(object));
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

	searchList(eShopId: number, query: string, filter: { limit?: number; offset?: number }, callback: (e: Error, productList?: List<Product>) => void) {
		this.model.find({ "eShopId": eShopId, "name": { $regex: query, $options: 'i' } })
		.limit(filter.limit)
		.skip(filter.offset)
		.exec((e: Error, objects: any[]) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, new List<Product>(objects, Product.fromObject));
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

	getListByProductIds(eShopId: number, productIds: number[], callback: (e: Error, productList?: List<Product>) => void) {
		this.model.find({ "eShopId": eShopId, "id": { $in: productIds } })
		.exec((e: Error, objects: any[]) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, new List<Product>(objects, Product.fromObject));
		});
	}
}
