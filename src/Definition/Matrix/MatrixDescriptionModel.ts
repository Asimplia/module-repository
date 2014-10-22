
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import LocalizedString = require('../Locale/LocalizedString');

export = MatrixDescriptionModel;
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
