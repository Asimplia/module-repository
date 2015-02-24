
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import ValueFailure = require('./ValueFailure');
import IValueFailureObject = require('./IValueFailureObject');

export = ValueFailureConverter;
class ValueFailureConverter extends Converter<ValueFailure, IValueFailureObject> {
	
	static $service = 'Entity.Feed.Failure.ValueFailureConverter';
	constructor() {
		super(ValueFailure);
	}
}
