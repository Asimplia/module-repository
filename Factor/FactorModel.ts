/// <reference path="../../../typings/mongoose/mongoose.d.ts" />
import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Definition = require('../Definition/Factor/Factor');

export = FactorModel;

var schema = new Schema(Definition);
var FactorModel = mongoose.model('Factor', schema);
