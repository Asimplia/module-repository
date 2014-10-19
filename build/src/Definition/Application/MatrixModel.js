var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
var MatrixModel = mongoose.model('Matrix', schema);
module.exports = MatrixModel;
