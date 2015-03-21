
import mongoose = require('mongoose');
import Category = require('../Entity/Application/Category');
import List = require('../Entity/List');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = CategoryLoader;
class CategoryLoader {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Application.CategoryModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, Category);
	}

	getById(eShopId: number, id: number, callback: (e: Error, category?: Category) => void) {
		this.model.findOne({ id: id, eShopId: eShopId }, (e: Error, object: mongoose.Document) => {
			this.documentExecutor.createByObject(e, object, callback);
		});
	}

	getCount(eShopId: number, callback: (e: Error, count?: number) => void): void {
		this.model.count({ eShopId: eShopId }, (e: Error, count: number) => {
			this.documentExecutor.createIntValue(e, count, callback);
		});
	}

	searchList(
		eShopId: number,
		query: string,
		filter: { limit?: number; offset?: number },
		callback: (e: Error, categoryList?: List<Category>) => void
	) {
		this.model.find({ eShopId: eShopId, name: { $regex: query, $options: 'i' } })
		.limit(filter.limit)
		.skip(filter.offset)
		.exec((e: Error, objects: mongoose.Document[]) => {
			this.documentExecutor.createListByObjects(e, objects, callback);
		});
	}

	getMaxDateCreated(callback: (e: Error, maxDateCreated?: Date) => void) {
		this.model.findOne({})
		.limit(1)
		.sort({ dateCreated: -1 })
		.exec((e: Error, object: mongoose.Document) => {
			this.documentExecutor.createDateValue(e, object, callback, 'dateCreated');
		});
	}

	getListByCategoryIds(eShopId: number, ids: number[], callback: (e: Error, categoryList?: List<Category>) => void) {
		this.model.find({ eShopId: eShopId, id: { $in: ids } })
		.exec((e: Error, objects: any[]) => {
			this.documentExecutor.createListByObjects(e, objects, callback);
		});
	}
}
