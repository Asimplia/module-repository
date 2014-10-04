var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Definition = require('../Definition/Application/Company');


var schema = new Schema(Definition);
var CompanyModel = mongoose.model('Company', schema);
module.exports = CompanyModel;
