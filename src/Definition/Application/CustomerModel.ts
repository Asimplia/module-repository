
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Schema = mongoose.Schema;

export = CustomerModel;
var Definition = {
	id: Number,
	name: String,
	vatNumber: String,
	dateCreated: Date
};
var schema = new Schema(Definition);
var CustomerModel = mongoose.model('Customer', schema);
