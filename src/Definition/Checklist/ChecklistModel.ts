
import mongoose = require('mongoose');
import Schema = mongoose.Schema;
import IChecklistDocument = require('./IChecklistDocument');

export = ChecklistModel;
var Definition = {
	id: Number
};
var schema = new Schema(Definition);
var ChecklistModel = <mongoose.Model<IChecklistDocument>>mongoose.model('Checklist', schema);
