/* tslint:disable */
import mongoose = require('mongoose');
import Schema = mongoose.Schema;

export = CompanyModel;
var Definition = {
	id: Number,
	name: String,
	vatNumber: String,
	dateCreated: Date
};
var schema = new Schema(Definition);
var CompanyModel = mongoose.model('Company', schema);
