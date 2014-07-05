
import IEntity = require('../IEntity');

export = Product;
class Product implements IEntity {

	get Name(): string { return this.name; }

	constructor(
		private id: number,
		private eShopId: number,
		private name: string,
		private fixPrice: number,
		private inEshop: boolean
		) { }

	static toObject(entity: Product) {
		return {
			id: entity.id,
			eShopId: entity.eShopId,
			name: entity.name,
			fixPrice: entity.fixPrice,
			inEshop: entity.inEshop
		};
	}

	toObject() {
		return Product.toObject(this);
	}

}
