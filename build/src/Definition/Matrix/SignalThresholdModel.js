var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Definition = {
    section: String,
    name: String,
    column: String,
    thresholdValue: {
        q1: Number,
        q2: Number,
        q3: Number,
        q4: Number
    },
    priority: {
        q1: Number,
        q2: Number,
        q3: Number,
        q4: Number
    },
    description: {
        q1: String,
        q2: String,
        q3: String,
        q4: String
    },
    dateValid: Date
};
var schema = new Schema(Definition);
var SignalThresholdModel = mongoose.model('SignalThreshold', schema);
module.exports = SignalThresholdModel;
