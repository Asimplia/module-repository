var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Definition = {
    id: Number,
    name: String,
    vatNumber: String,
    dateCreated: Date
};
var schema = new Schema(Definition);
var ProductModel = mongoose.model('Product', schema);
module.exports = ProductModel;
