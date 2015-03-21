
import Util = require('asimplia-util');
import ErrorLogger = Util.ErrorLogger;
import IObjectableError = Util.Error.IObjectableError;
import ErrorLogRecorder = require('./ErrorLogRecorder');
import ErrorLog = require('../Entity/Error/ErrorLog');
import ErrorTypeEnum = require('../Entity/Error/ErrorTypeEnum');
import EntityPreparer = require('../Entity/EntityPreparer');
import ApplicationTypeEnum = require('../Entity/Error/ApplicationTypeEnum');
/* tslint:disable */
Util;
/* tslint:enable */

export = ConsoleLogging;
class ConsoleLogging {

	static $args = [null];
	static $inject = [
		ErrorLogger,
		ErrorLogRecorder
	];
	constructor(
		private applicationType: ApplicationTypeEnum,
		private errorLogger: ErrorLogger,
		private errorLogRecorder: ErrorLogRecorder
	) {}

	intercept() {
		this.errorLogger.setToObjectOnError();
		this.errorLogger.catchErrors(
			ErrorTypeEnum.UNCAUGHT_ERROR,
			ErrorTypeEnum.ERROR,
			ErrorTypeEnum.WARNING,
			(e: IObjectableError, errorType: ErrorTypeEnum) => this.saveErrorLog(e, errorType)
		);
	}

	private saveErrorLog(e: IObjectableError, errorType: ErrorTypeEnum) {
		if (errorType == ErrorTypeEnum.UNCAUGHT_ERROR) {
			console.dir(e);
		}
		var errorLog = new ErrorLog(
			null,
			this.applicationType,
			errorType,
			EntityPreparer.now(),
			e.toObject()
		);
		this.errorLogRecorder.insert(errorLog, () => {
			console.log('ErrorLog created');
		});
	}
}
