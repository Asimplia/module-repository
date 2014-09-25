
import IEntity = require('../IEntity');
import List = require('../List');
import ServiceConnection = require('./ServiceConnection');
import ServiceTypeEnum = require('./ServiceTypeEnum');
import EntityPreparer = require('../EntityPreparer');

export = EShop;
class EShop implements IEntity {

	get Id() { return this.id; }
	get Name() { return this.name; }

	constructor(
		private id: number,
		private name: string,
		private serviceConnectionList: List<ServiceConnection>
	) {}

	toObject() {
		return EShop.toObject(this);
	}

	static toObject(e: EShop) {
		return {
			id: e.id,
			name: e.name,
			serviceConnections: e.serviceConnectionList.toArray(ServiceConnection.toObject)
		};
	}

	static fromObject(o: any) {
		return new EShop(
			EntityPreparer.intOrNull(o.id),
			EntityPreparer.string(o.name),
			new List<ServiceConnection>(o.serviceConnections, ServiceConnection.fromObject)
		);
	}

	addServiceConnection(serviceType: ServiceTypeEnum, info: any) {
		this.serviceConnectionList.push(new ServiceConnection(
			serviceType,
			EntityPreparer.now(),
			info
		));
	}

	getServiceConnection(serviceType: ServiceTypeEnum) {
		return this.serviceConnectionList.findOneOnly((serviceConnection: ServiceConnection) => {
			return serviceConnection.ServiceType == serviceType;
		});
	}
}
