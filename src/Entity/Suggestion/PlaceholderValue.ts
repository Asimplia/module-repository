
import IEntity = require('../IEntity');
import ActionPlaceholderEnum = require('./ActionPlaceholderEnum');
import ActionPlaceholderFactory = require('./ActionPlaceholderFactory');

export = PlaceholderValue;
class PlaceholderValue implements IEntity {

	get Placeholder() { return this.placeholder; }
	get Value() { return this.value; }

	constructor(
		private placeholder: ActionPlaceholderEnum,
		private value: any
	) { }

	static fromObject(object: any) {
		return new PlaceholderValue(
			ActionPlaceholderFactory.createActionPlaceholderEnum(object.placeholder),
			object.value
		);
	}

	static toObject(entity: PlaceholderValue) {
		return {
			placeholder: ActionPlaceholderEnum[entity.placeholder],
			value: entity.value
		};
	}

	toObject() {
		return PlaceholderValue.toObject(this);
	}

}
