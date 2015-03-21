/* tslint:disable */
import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Definition = require('./Result');

export = ResultModel;

var schema = new Schema(Definition);
var ResultModel = mongoose.model('SuggestionResult', schema);
