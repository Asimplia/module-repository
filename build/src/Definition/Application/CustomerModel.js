var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Definition = {
    id: Number,
    eShopId: Number,
    firstname: String,
    lastname: String,
    email: String,
    gender: String,
    birthday: Date,
    anonymous: Boolean,
    dateCreated: Date
};
var schema = new Schema(Definition);
var CustomerModel = mongoose.model('Customer', schema);
module.exports = CustomerModel;
