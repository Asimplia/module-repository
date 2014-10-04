var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Definition = require('../Definition/Application/EShop');


var schema = new Schema(Definition);
var EShopModel = mongoose.model('EShop', schema);
module.exports = EShopModel;
