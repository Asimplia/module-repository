var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Definition = require('../Definition/Suggestion/Result');


var schema = new Schema(Definition);
var ResultModel = mongoose.model('SuggestionResult', schema);
module.exports = ResultModel;
