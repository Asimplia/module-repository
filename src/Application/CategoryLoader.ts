
import mongoose = require('mongoose');
import Category = require('../Entity/Application/Category');
import List = require('../Entity/List');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import CategoryModel = require('../Definition/Application/CategoryModel');

export = CategoryLoader;
class CategoryLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = CategoryModel;
	}

	getById(eShopId: number, id: number, callback: (e: Error, category?: Category) => void) {
		this.model.findOne({ "id": id, "eShopId": eShopId }, (e, object: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, Category.fromObject(object));
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

	searchList(eShopId: number, query: string, filter: { limit?: number; offset?: number }, callback: (e: Error, categoryList?: List<Category>) => void) {
		this.model.find({ "eShopId": eShopId, "name": { $regex: query, $options: 'i' } })
		.limit(filter.limit)
		.skip(filter.offset)
		.exec((e: Error, objects: any[]) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, new List<Category>(objects, Category.fromObject));
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

	getListByCategoryIds(eShopId: number, ids: number[], callback: (e: Error, categoryList?: List<Category>) => void) {
		this.model.find({ "eShopId": eShopId, "id": { $in: ids } })
		.exec((e: Error, objects: any[]) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, new List<Category>(objects, Category.fromObject));
		});
	}
}
