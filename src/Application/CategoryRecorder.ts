
import mongoose = require('mongoose');
import Category = require('../Entity/Application/Category');
import List = require('../Entity/List');
import CategoryModel = require('../Definition/Application/CategoryModel');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = CategoryRecorder;
class CategoryRecorder {
	
	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Application.CategoryModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, Category);
	}

	insertOrUpdateList(categoryList: List<Category>, callback: (e: Error, categoryList?: List<Category>) => void) {
		this.documentExecutor.insertOrUpdateList(categoryList, callback);
	}

	insertOrUpdate(category: Category, callback: (e: Error, category?: Category) => void) {
		this.documentExecutor.insertOrUpdate(category, callback);
	}
}
