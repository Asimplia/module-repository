
export = Factor;
class Factor {

	constructor() { }

	static fromObject(o: any/*FactorObject*/): Factor {
		return new Factor();
	}

	static toObject(entity: Factor) {
		return {

		};
	}

	toObject() {
		return Factor.toObject(this);
	}
}
