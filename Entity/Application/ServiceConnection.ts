
import IEntity = require('../IEntity');
import ServiceTypeEnum = require('./ServiceTypeEnum');
import ServiceTypeFactory = require('./ServiceTypeFactory');
import moment = require('moment');
import EntityPreparer = require('../EntityPreparer');

export = ServiceConnection;
class ServiceConnection implements IEntity {

	get ServiceType() { return this.serviceType; }

	constructor(
		private serviceType: ServiceTypeEnum,
		private dateCreated: Date,
		private info: any
	) {}
	
	toObject() {
		return ServiceConnection.toObject(this);
	}

	static toObject(e: ServiceConnection) {
		return {
			serviceType: ServiceTypeEnum[e.serviceType],
			dateCreated: EntityPreparer.fromDate(e.dateCreated),
			info: e.info
		};
	}

	static fromObject(o: any) {
		return new ServiceConnection(
			ServiceTypeFactory.createServiceTypeEnum(o.serviceType),
			EntityPreparer.date(o.dateCreated),
			o.info
		);
	}
}
