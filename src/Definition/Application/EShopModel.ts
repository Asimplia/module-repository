
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

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
	dateCreated: Date
};
var schema = new Schema(Definition);
var EShopModel = mongoose.model('EShop', schema);
