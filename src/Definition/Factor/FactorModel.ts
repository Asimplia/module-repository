/* tslint:disable */
import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Definition = require('./Factor');

export = FactorModel;

var schema = new Schema(Definition);
var FactorModel = mongoose.model('Factor', schema);
