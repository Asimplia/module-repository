
import mongoose = require('mongoose');
import Schema = mongoose.Schema;

export = MatrixLoadModel;
var Definition = {
	id: Number,
	eShopId: Number,
	dateLoaded: Date
};
var schema = new Schema(Definition);
var MatrixLoadModel = mongoose.model('MatrixLoad', schema);
