
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import HeurekaAccessory = require('./HeurekaAccessory');
import IHeurekaAccessoryObject = require('./IHeurekaAccessoryObject');

export = HeurekaAccessoryConverter;
class HeurekaAccessoryConverter extends Converter<HeurekaAccessory, IHeurekaAccessoryObject> {
	
	static $service = 'Entity.Feed.Heureka.HeurekaAccessoryConverter';
	constructor() {
		super(HeurekaAccessory);
	}
}
