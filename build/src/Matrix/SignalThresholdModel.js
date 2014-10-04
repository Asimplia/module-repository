var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Definition = require('../Definition/Matrix/SignalThreshold');


var schema = new Schema(Definition);
var SignalThreshold = mongoose.model('SignalThreshold', schema);
module.exports = SignalThreshold;
