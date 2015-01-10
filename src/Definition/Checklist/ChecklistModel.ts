
import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import IChecklistDocument = require('./IChecklistDocument');
import Image = require('../Image/Image');
import LocalizedString = require('../Locale/LocalizedString');

export = ChecklistModel;
var Definition = {
	id: String,
	dateCreated: Date,
	section: String,
	name: LocalizedString,
	checkItems: [{
		checkType: String,
		dateChecked: Date
	}],
	mainImage: Image,
	dateResolved: Date
};
var schema = new Schema(Definition);
var ChecklistModel = <mongoose.Model<IChecklistDocument>>mongoose.model('Checklist', schema);
