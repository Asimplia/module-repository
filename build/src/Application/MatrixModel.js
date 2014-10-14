var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Definition = require('../Definition/Application/Matrix');


var schema = new Schema(Definition);
var MatrixModel = mongoose.model('Matrix', schema);
module.exports = MatrixModel;
