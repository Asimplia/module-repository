
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import AbstractRecorder = require('../AbstractRecorder');
import Category = require('../Entity/Application/Category');
import List = require('../Entity/List');
import CategoryModel = require('../Definition/Application/CategoryModel');

export = CategoryRecorder;
class CategoryRecorder extends AbstractRecorder {
	
	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.model = CategoryModel;
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
		this.model.findOne({ id: category.Id }, (e, doc: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!doc) {
				doc = new this.model({});
				this.getNextId(this.model, (id) => {
					category.Id = id;
					this.update(doc, Category.fromObject, category, callback);
				});
				return;
			}
			this.update(doc, Category.fromObject, category, callback);
		});
	}
}
