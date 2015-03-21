/* tslint:disable */
import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import IMatrixDocument = require('./IMatrixDocument');

export = MatrixModel;
var Definition = {
	id: Number,
	eShopId: Number,
	section: String,
	loadId: Number,
	scoreAbsolute: Number,
	scoreRelative: Number,
	scoreWeight: Number,
	changeAbsolute: Number,
	changeRelative: Number,
	changeWeight: Number,
	prediction: Number,
	quadrant: String,
	dateValid: Date,
	inputValueX: Number,
	inputValueY: Number,
	changeValueX: Number,
	changeValueY: Number,
	tangens: Number,
	changeTangens: Number,
	productId: Number,
	customerId: Number,
	channelId: Number,
	categoryId: Number
};
var schema = new Schema(Definition);
var MatrixModel = <mongoose.Model<IMatrixDocument>>mongoose.model('Matrix', schema);
