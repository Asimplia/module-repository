
import ValueTypeGroupList = require('./ValueType/ValueTypeGroupList');
import Category = require('../Application/Category');

export = CheckItemFilter;
class CheckItemFilter {

	private valueTypeGroupList: ValueTypeGroupList;
	private category: Category;

	get ValueTypeGroupList() { return this.valueTypeGroupList; }
	get Category() { return this.category; }

}
