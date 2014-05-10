
import IEntity = require('../IEntity');
import Factor = require('../Factor/Factor');
import FactorValue = require('./FactorValue');

export = FactorDefinition;
class FactorDefinition implements IEntity {

	get Value() { return this.value; }
	set Value(value) { this.value = value; }
	get Weight() { return this.weight; }
	set Weight(value) { this.weight = value; }
	get Factor() { return this.factor; }
	set Factor(value) { this.factor = value; }

	constructor(
		private value: FactorValue,
		private weight: number,
		private factor: Factor
	) { }

	static fromObject(o: any/*FactorDefinitionObject*/): FactorDefinition {
		return new FactorDefinition(
			new FactorValue(o.value),
			o.weight,
			Factor.fromObject(o.factor)
		);
	}

	static toObject(entity: FactorDefinition): any {
		return {
			value: entity.value ? entity.value.toString() : null,
			weight: entity.weight,
			factor: entity.factor ? entity.factor.toObject() : null
		};
	}
}
