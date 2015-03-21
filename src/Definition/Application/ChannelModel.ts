/* tslint:disable */
import mongoose = require('mongoose');
import Schema = mongoose.Schema;

export = ChannelModel;
var Definition = {
	id: Number,
	eShopId: Number,
	customerId: Number,
	name: String,
	paidChannel: Boolean,
	refferalOrganic: Boolean,
	dateCreated: Date
};
var schema = new Schema(Definition);
var ChannelModel = mongoose.model('Channel', schema);
