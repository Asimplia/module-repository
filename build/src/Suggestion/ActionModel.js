﻿var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Definition = require('../Definition/Suggestion/Action');


var schema = new Schema(Definition);
var ActionModel = mongoose.model('SuggestionAction', schema);
module.exports = ActionModel;