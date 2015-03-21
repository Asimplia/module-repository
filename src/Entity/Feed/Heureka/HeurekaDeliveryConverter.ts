
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import HeurekaDelivery = require('./HeurekaDelivery');
import IHeurekaDeliveryObject = require('./IHeurekaDeliveryObject');
/* tslint:disable */
Util;
/* tslint:enable */

export = HeurekaDeliveryConverter;
class HeurekaDeliveryConverter extends Converter<HeurekaDelivery, IHeurekaDeliveryObject> {

	static $service = 'Entity.Feed.Heureka.HeurekaDeliveryConverter';
	constructor() {
		super(HeurekaDelivery);
	}
}
