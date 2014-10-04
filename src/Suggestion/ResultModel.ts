
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Definition = require('../Definition/Suggestion/Result');

export = ResultModel;

var schema = new Schema(Definition);
var ResultModel = mongoose.model('SuggestionResult', schema);
