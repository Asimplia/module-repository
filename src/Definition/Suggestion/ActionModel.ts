/* tslint:disable */
import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Definition = require('./Action');

export = ActionModel;

var schema = new Schema(Definition);
var ActionModel = mongoose.model('SuggestionAction', schema);
