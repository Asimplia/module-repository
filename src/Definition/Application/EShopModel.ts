/* tslint:disable */
import mongoose = require('mongoose');
import Schema = mongoose.Schema;

export = EShopModel;
var Definition = {
	id: Number,
	name: String,
	serviceConnections: [{
		serviceType: String,
		dateCreated: Date,
		info: Object
	}],
	url: String,
	dateCreated: Date,
	imageUri: String
};
var schema = new Schema(Definition);
var EShopModel = mongoose.model('EShop', schema);
