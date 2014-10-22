var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var LocalizedString = require('../Locale/LocalizedString');

var Definition = {
    section: String,
    icon: String,
    description: LocalizedString,
    quadrantDescriptions: [{
            quadrant: String,
            description: LocalizedString
        }]
};
var schema = new Schema(Definition);
var MatrixDescriptionModel = mongoose.model('MatrixDescription', schema);
module.exports = MatrixDescriptionModel;
