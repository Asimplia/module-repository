var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Definition = {
    id: Number,
    name: String,
    serviceConnections: [{
            serviceType: String,
            dateCreated: Date,
            info: Object
        }],
    url: String,
    dateCreated: Date
};
var schema = new Schema(Definition);
var EShopModel = mongoose.model('EShop', schema);
module.exports = EShopModel;
