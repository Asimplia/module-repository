
import IEntity = require('../IEntity');
import ServiceTypeEnum = require('./ServiceTypeEnum');
import ServiceTypeFactory = require('./ServiceTypeFactory');
import EntityPreparer = require('../EntityPreparer');

export = ServiceConnection;
class ServiceConnection implements IEntity {

	get ServiceType() { return this.serviceType; }
	get Info() { return this.info; }
	set Info(value: any) { this.info = value; }

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
			dateCreated: EntityPreparer.formatDate(e.dateCreated),
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
