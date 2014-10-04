var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Definition = require('../Definition/Application/User');


var schema = new Schema(Definition);
var UserModel = mongoose.model('User', schema);
module.exports = UserModel;
