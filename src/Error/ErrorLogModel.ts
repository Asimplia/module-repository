
import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Definition = require('../Definition/Error/ErrorLog');

export = ErrorLogModel;

var schema = new Schema(Definition);
var ErrorLogModel = mongoose.model('ErrorLog', schema);
