
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import HeurekaDelivery = require('./HeurekaDelivery');
import IHeurekaDeliveryObject = require('./IHeurekaDeliveryObject');

export = HeurekaDeliveryConverter;
class HeurekaDeliveryConverter extends Converter<HeurekaDelivery, IHeurekaDeliveryObject> {
	
	static $service = 'Entity.Feed.HeurekaDeliveryConverter';
	constructor() {
		super(HeurekaDelivery);
	}
}
