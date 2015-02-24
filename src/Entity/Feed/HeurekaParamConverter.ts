
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import HeurekaParam = require('./HeurekaParam');
import IHeurekaParamObject = require('./IHeurekaParamObject');

export = HeurekaParamConverter;
class HeurekaParamConverter extends Converter<HeurekaParam, IHeurekaParamObject> {
	
	static $service = 'Entity.Feed.HeurekaParamConverter';
	constructor() {
		super(HeurekaParam);
	}
}
