
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import HeurekaProduct = require('./HeurekaProduct');
import IHeurekaProductObject = require('./IHeurekaProductObject');
/* tslint:disable */
Util;
/* tslint:enable */

export = HeurekaProductConverter;
class HeurekaProductConverter extends Converter<HeurekaProduct, IHeurekaProductObject> {

	static $service = 'Entity.Feed.Heureka.HeurekaProductConverter';
	constructor() {
		super(HeurekaProduct);
	}
}
