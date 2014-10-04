
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Definition = require('../Definition/Application/User');

export = UserModel;

var schema = new Schema(Definition);
var UserModel = mongoose.model('User', schema);
