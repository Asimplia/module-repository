
import LocalizedString = require('../../Locale/LocalizedString');
import ValueTypeList = require('./ValueTypeList');

export = ValueTypeGroup;
class ValueTypeGroup {

	get Name() { return this.name; }
	get ValueTypeList() { return this.valueTypeList; }

	constructor(
		private name: LocalizedString,
		private valueTypeList: ValueTypeList
	) {}
}
