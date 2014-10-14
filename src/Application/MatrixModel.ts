
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Definition = require('../Definition/Application/Matrix');

export = MatrixModel;

var schema = new Schema(Definition);
var MatrixModel = mongoose.model('Matrix', schema);
