
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import ProductTraffic = require('./ProductTraffic');
import IProductTrafficObject = require('./IProductTrafficObject');

export = ProductTrafficConverter;
class ProductTrafficConverter extends Converter<ProductTraffic, IProductTrafficObject> {
	
	static $service = 'Entity.Feed.Check.Traffic.ProductTrafficConverter';
	constructor() {
		super(ProductTraffic);
	}
}
