var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Definition = {
    id: Number,
    eShopId: Number,
    parentCategoryId: Number,
    name: String,
    dateCreated: Date
};
var schema = new Schema(Definition);
var CategoryModel = mongoose.model('Category', schema);
module.exports = CategoryModel;
