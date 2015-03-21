
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import HeurekaParam = require('./HeurekaParam');
import IHeurekaParamObject = require('./IHeurekaParamObject');
/* tslint:disable */
Util;
/* tslint:enable */

export = HeurekaParamConverter;
class HeurekaParamConverter extends Converter<HeurekaParam, IHeurekaParamObject> {

	static $service = 'Entity.Feed.Heureka.HeurekaParamConverter';
	constructor() {
		super(HeurekaParam);
	}
}
