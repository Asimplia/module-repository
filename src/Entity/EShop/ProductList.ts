
import List = require('../List');
import Product = require('./Product');

export = ProductList;
class ProductList extends List<Product> {

	getById(id: number) {
		var index = this.indexBy('Id');
		return index[id];
	}
	
}
