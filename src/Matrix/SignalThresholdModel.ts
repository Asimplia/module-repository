
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import Definition = require('../Definition/Matrix/SignalThreshold');

export = SignalThreshold;

var schema = new Schema(Definition);
var SignalThreshold = mongoose.model('SignalThreshold', schema);
