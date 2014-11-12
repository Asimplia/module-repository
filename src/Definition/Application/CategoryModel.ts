
import mongoose = require('mongoose');
import Schema = mongoose.Schema;

export = CategoryModel;
var Definition = {
	id: Number,
	eShopId: Number,
	parentCategoryId: Number,
	name: String,
	dateCreated: Date
};
var schema = new Schema(Definition);
var CategoryModel = mongoose.model('Category', schema);
