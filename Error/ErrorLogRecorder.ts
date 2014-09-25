
/// <reference path="../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import AbstractRecorder = require('../AbstractRecorder');
import ErrorLog = require('../Entity/Error/ErrorLog');
import ErrorLogModel = require('./ErrorLogModel');

export = ErrorLogRecorder;
class ErrorLogRecorder extends AbstractRecorder {
	
	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.model = ErrorLogModel;
	}

	insert(errorLog: ErrorLog, callback: (e: Error, errorLog?: ErrorLog) => void) {
		var errorLogDocument = new this.model({});
		this.update(errorLogDocument, ErrorLog.fromObject, errorLog, callback);
	}
}
