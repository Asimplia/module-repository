
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import Value = require('./Value');
import IValueObject = require('./IValueObject');
/* tslint:disable */
Util;
/* tslint:enable */

export = ValueConverter;
class ValueConverter extends Converter<Value, IValueObject> {

	static $service = 'Entity.Value.ValueConverter';
	constructor() {
		super(Value);
	}
}
