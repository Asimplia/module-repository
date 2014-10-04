var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Definition = require('../Definition/Error/ErrorLog');


var schema = new Schema(Definition);
var ErrorLogModel = mongoose.model('ErrorLog', schema);
module.exports = ErrorLogModel;
