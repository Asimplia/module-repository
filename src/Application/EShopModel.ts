
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Definition = require('../Definition/Application/EShop');

export = EShopModel;

var schema = new Schema(Definition);
var EShopModel = mongoose.model('EShop', schema);
