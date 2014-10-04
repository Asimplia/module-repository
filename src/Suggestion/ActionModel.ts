
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Definition = require('../Definition/Suggestion/Action');

export = ActionModel;

var schema = new Schema(Definition);
var ActionModel = mongoose.model('SuggestionAction', schema);
