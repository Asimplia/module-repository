
import mongoose = require('mongoose');
import AbstractRecorder = require('../AbstractRecorder');
import Category = require('../Entity/Application/Category');
import List = require('../Entity/List');
import CategoryModel = require('../Definition/Application/CategoryModel');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = CategoryRecorder;
class CategoryRecorder extends AbstractRecorder {
	
	private model: mongoose.Model<mongoose.Document>;
	private documentExecutor: DocumentExecutor;

	constructor() {
		super();
		this.model = CategoryModel;
		this.documentExecutor = new DocumentExecutor(this.model, Category);
	}

	insertOrUpdateList(categoryList: List<Category>, callback: (e: Error, categoryList?: List<Category>) => void) {
		categoryList.createEach().on('item', (category: Category, next) => {
			this.insertOrUpdate(category, next);
		})
		.on('error', (e: Error) => {
			callback(e);
		})
		.on('end', () => {
			callback(null, categoryList);
		});
	}

	insertOrUpdate(category: Category, callback: (e: Error, category?: Category) => void) {
		this.documentExecutor.insertOrUpdate(category, callback);
	}
}
