
import mongoose = require('mongoose');
import ErrorLog = require('../Entity/Error/ErrorLog');
import DocumentExecutor = require('../Util/DocumentExecutor');
import ErrorLogModel = require('../Definition/Error/ErrorLogModel');

export = ErrorLogRecorder;
class ErrorLogRecorder {
	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Error.ErrorLogModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, ErrorLog);
	}

	insert(errorLog: ErrorLog, callback: (e: Error, errorLog?: ErrorLog) => void) {
		this.documentExecutor.insertOrUpdate(errorLog, callback);
	}
}
