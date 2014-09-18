
import IEntity = require('../IEntity');
import Factor = require('../Factor/Factor');
import FactorValue = require('./FactorValue');
import EntityPreparer = require('../EntityPreparer');

export = FactorDefinition;
class FactorDefinition implements IEntity {

	get Value() { return this.value; }
	set Value(value) { this.value = value; }
	get Weight() { return this.weight; }
	set Weight(value) { this.weight = value; }
	get Factor() { return this.factor; }
	set Factor(value) { this.factor = value; }
	get Reverse() { return this.reverse; }
	set Reverse(value) { this.reverse = value; }

	constructor(
		private value: FactorValue,
		private weight: number,
		private factor: Factor,
		private reverse: boolean
	) { }

	static fromObject(o: any/*FactorDefinitionObject*/): FactorDefinition {
		return new FactorDefinition(
			new FactorValue(EntityPreparer.stringOrNull(o.value)),
			EntityPreparer.float(o.weight),
			Factor.fromObject(o.factor),
			EntityPreparer.boolean(o.reverse)
		);
	}

	static toObject(entity: FactorDefinition): any {
		return {
			value: entity.value ? entity.value.toString() : null,
			weight: entity.weight,
			factor: entity.factor ? entity.factor.toObject() : null,
			reverse: entity.reverse
		};
	}

	toObject() {
		return FactorDefinition.toObject(this);
	}
}
