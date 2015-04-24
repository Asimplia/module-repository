
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import CheckItem = require('./CheckItem');
import ICheckItemObject = require('./ICheckItemObject');
/* tslint:disable */
Util;
/* tslint:enable */

export = CheckItemConverter;
class CheckItemConverter extends Converter<CheckItem, ICheckItemObject> {

	static $service = 'Entity.CheckItem.CheckItemConverter';
	constructor() {
		super(CheckItem);
	}
}
