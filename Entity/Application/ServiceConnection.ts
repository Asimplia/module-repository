
import IEntity = require('../IEntity');
import ServiceTypeEnum = require('./ServiceTypeEnum');
import ServiceTypeFactory = require('./ServiceTypeFactory');
import moment = require('moment');

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
			dateCreated: moment(e.dateCreated).format('YYYY-MM-DD'),
			info: e.info
		};
	}

	static fromObject(o: any) {
		return new ServiceConnection(
			ServiceTypeFactory.createServiceTypeEnum(o.serviceType),
			moment(o.dateCreated).toDate(),
			o.info
		);
	}
}
