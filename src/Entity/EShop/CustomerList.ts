
import List = require('../List');
import Customer = require('./Customer');

export = CustomerList;
class CustomerList extends List<Customer> {

	getById(id: number) {
		var index = this.indexBy('Id');
		return index[id];
	}
}
