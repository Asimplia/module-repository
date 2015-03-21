
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import Column = require('./Column');
import IColumnObject = require('./IColumnObject');
/* tslint:disable */
Util;
/* tslint:enable */

export = ColumnConverter;
class ColumnConverter extends Converter<Column, IColumnObject> {

	static $service = 'Entity.Feed.Check.ColumnConverter';
	constructor() {
		super(Column);
	}
}
