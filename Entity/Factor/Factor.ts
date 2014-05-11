
export = Factor;
class Factor {

	set Id(value) { this.id = value; }
	get Id() { return this.id; }

	constructor(
		private id: number,
		private name: string,
		private description: string,
		private section: string,
		private weight: number,
		private values: string[]
	) { }

	static fromObject(o: any/*FactorObject*/): Factor {
		return new Factor(
			o.id,
			o.name,
			o.description,
			o.section,
			o.weight,
			o.values
		);
	}

	static toObject(entity: Factor) {
		return {
			id: entity.id,
			name: entity.name,
			description: entity.description,
			section: entity.section,
			weight: entity.weight,
			values: entity.values
		};
	}

	toObject() {
		return Factor.toObject(this);
	}
}
