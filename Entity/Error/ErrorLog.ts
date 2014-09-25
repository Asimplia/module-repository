
import ErrorTypeEnum = require('./ErrorTypeEnum');
import EntityPreparer = require('../EntityPreparer');
import IEntity = require('../IEntity');

export = ErrorLog;
class ErrorLog implements IEntity {
	
	constructor(
		private errorType: ErrorTypeEnum,
		private dateCreated: Date,
		private errorData: Error
	) {}

	static fromObject(o: any) {
		return new ErrorLog(
			o.errorType,
			EntityPreparer.date(o.dateCreated),
			o.errorData
		);
	}

	static toObject(e: ErrorLog) {
		return {
			errorType: ErrorTypeEnum[e.errorType],
			dateCreated: EntityPreparer.fromDate(e.dateCreated),
			errorData: e.errorData
		};
	}

	toObject() {
		return ErrorLog.toObject(this);
	}
}
