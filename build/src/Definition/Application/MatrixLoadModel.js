var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Definition = {
    id: Number,
    eShopId: Number,
    dateLoaded: Date
};
var schema = new Schema(Definition);
var MatrixLoadModel = mongoose.model('MatrixLoad', schema);
module.exports = MatrixLoadModel;
