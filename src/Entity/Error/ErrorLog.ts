
import ApplicationTypeEnum = require('./ApplicationTypeEnum');
import ErrorTypeEnum = require('./ErrorTypeEnum');
import EntityPreparer = require('../EntityPreparer');
import IIdentificableEntity = require('../Common/IIdentificableEntity');

export = ErrorLog;
class ErrorLog implements IIdentificableEntity {

	get Id() { return this.id; }

	constructor(
		private id: string,
		private applicationType: ApplicationTypeEnum,
		private errorType: ErrorTypeEnum,
		private dateCreated: Date,
		private errorData: Error
	) {}

	static fromObject(o: any) {
		return new ErrorLog(
			EntityPreparer.id(o.id),
			EntityPreparer.enum<ApplicationTypeEnum>(ApplicationTypeEnum, o.applicationType),
			EntityPreparer.enum<ErrorTypeEnum>(ErrorTypeEnum, o.errorType),
			EntityPreparer.date(o.dateCreated),
			o.errorData
		);
	}

	static toObject(e: ErrorLog) {
		return {
			id: e.id,
			applicationType: ApplicationTypeEnum[e.applicationType],
			errorType: ErrorTypeEnum[e.errorType],
			dateCreated: EntityPreparer.formatDate(e.dateCreated),
			errorData: e.errorData
		};
	}

	toObject() {
		return ErrorLog.toObject(this);
	}
}
