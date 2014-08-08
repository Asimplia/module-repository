/// <reference path="../typings/mongoose/mongoose.d.ts" />
import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Definition = require('../Definition/Application/Company');

export = CompanyModel;

var schema = new Schema(Definition);
var CompanyModel = mongoose.model('Company', schema);
