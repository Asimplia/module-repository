
import List = require('../List');
import Category = require('./Category');

export = CategoryList;
class CategoryList extends List<Category> {

	getById(id: number) {
		var index = this.indexBy('Id');
		return index[id];
	}
	
}
