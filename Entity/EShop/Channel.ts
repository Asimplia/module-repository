
import IEntity = require('../IEntity');

export = Channel;
class Channel implements IEntity {

	get Id(): number { return this.id; }

	constructor(
		private id: number,
		private eShopId: number
		) { }

	static toObject(entity: Channel) {
		return {
			id: entity.id,
			eShopId: entity.eShopId
		};
	}

	toObject() {
		return Channel.toObject(this);
	}

}
