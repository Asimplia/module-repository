
import IEntity = require('../IEntity');

export = Customer;
class Customer implements IEntity {

	get Id(): number { return this.id; }

	constructor(
		private id: number,
		private eShopId: number
		) { }

	static toObject(entity: Customer) {
		return {
			id: entity.id,
			eShopId: entity.eShopId
		};
	}

	toObject() {
		return Customer.toObject(this);
	}

}
