
import IEntity = require('../IEntity');

export = EShop;
class EShop implements IEntity {

	get Id() { return this.id; }
	get Name() { return this.name; }

	constructor(
		private id: number,
		private name: string
		) {}

	toObject() {
		return EShop.toObject(this);
	}

	static toObject(e: EShop) {
		return {
			id: e.id,
			name: e.name
		};
	}

	static fromObject(o: any) {
		return new EShop(
			o.id,
			o.name
		);
	}
}
