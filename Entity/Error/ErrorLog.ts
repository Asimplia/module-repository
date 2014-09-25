
import ApplicationTypeEnum = require('./ApplicationTypeEnum');
import ErrorTypeEnum = require('./ErrorTypeEnum');
import EntityPreparer = require('../EntityPreparer');
import IEntity = require('../IEntity');

export = ErrorLog;
class ErrorLog implements IEntity {
	
	constructor(
		private applicationType: ApplicationTypeEnum,
		private errorType: ErrorTypeEnum,
		private dateCreated: Date,
		private errorData: Error
	) {}

	static fromObject(o: any) {
		return new ErrorLog(
			o.applicationType, // TODO
			o.errorType, // TODO
			EntityPreparer.date(o.dateCreated),
			o.errorData
		);
	}

	static toObject(e: ErrorLog) {
		return {
			applicationType: ApplicationTypeEnum[e.applicationType],
			errorType: ErrorTypeEnum[e.errorType],
			dateCreated: EntityPreparer.fromDate(e.dateCreated),
			errorData: e.errorData
		};
	}

	toObject() {
		return ErrorLog.toObject(this);
	}
}
