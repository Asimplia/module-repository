
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Schema = mongoose.Schema;

export = ProductModel;
var Definition = {
	id: Number,
	eShopId: Number,
	name: String,
	vatNumber: String,
	dateCreated: Date
};
var schema = new Schema(Definition);
var ProductModel = mongoose.model('Product', schema);
