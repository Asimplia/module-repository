
import LocalizedString = require('../../Locale/LocalizedString');
import ValueTypeEnum = require('../ValueTypeEnum');

export = ValueType;
class ValueType {

	get Name() { return this.name; }
	get Message() { return this.message; }
	get Type() { return this.type; }

	constructor(
		private type: ValueTypeEnum,
		private name: LocalizedString,
		private message: LocalizedString
	) {}
}
