var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
module.exports = ChannelModel;
