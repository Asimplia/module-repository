
import mongoose = require('mongoose');
import Schema = mongoose.Schema;

export = ProductModel;
var Definition = {
	id: Number,
	eShopId: Number,
	name: String,
	vatNumber: String,
	dateCreated: Date,
	imageUri: String
};
var schema = new Schema(Definition);
var ProductModel = mongoose.model('Product', schema);
