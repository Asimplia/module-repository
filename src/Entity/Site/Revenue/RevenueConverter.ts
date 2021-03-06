
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import Revenue = require('./Revenue');
import IRevenueObject = require('./IRevenueObject');
/* tslint:disable */
Util;
/* tslint:enable */

export = RevenueConverter;
class RevenueConverter extends Converter<Revenue, IRevenueObject> {

	static $service = 'Entity.Site.Revenue.RevenueConverter';
	constructor() {
		super(Revenue);
	}
}
