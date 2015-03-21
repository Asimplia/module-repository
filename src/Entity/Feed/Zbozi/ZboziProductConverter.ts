
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import ZboziProduct = require('./ZboziProduct');
import IZboziProductObject = require('./IZboziProductObject');
/* tslint:disable */
Util;
/* tslint:enable */

export = ZboziProductConverter;
class ZboziProductConverter extends Converter<ZboziProduct, IZboziProductObject> {

	static $service = 'Entity.Feed.Zbozi.ZboziProductConverter';
	constructor() {
		super(ZboziProduct);
	}
}
