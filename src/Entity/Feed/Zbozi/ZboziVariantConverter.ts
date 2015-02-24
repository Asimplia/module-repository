
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import ZboziVariant = require('./ZboziVariant');
import IZboziVariantObject = require('./IZboziVariantObject');

export = ZboziVariantConverter;
class ZboziVariantConverter extends Converter<ZboziVariant, IZboziVariantObject> {
	
	static $service = 'Entity.Feed.Zbozi.ZboziVariantConverter';
	constructor() {
		super(ZboziVariant);
	}
}
