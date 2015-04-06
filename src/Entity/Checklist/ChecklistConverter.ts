
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import Checklist = require('./Checklist');
import IChecklistObject = require('./IChecklistObject');
/* tslint:disable */
Util;
/* tslint:enable */

export = ChecklistConverter;
class ChecklistConverter extends Converter<Checklist, IChecklistObject> {

	static $service = 'Entity.Checklist.ChecklistConverter';
	constructor() {
		super(Checklist);
	}
}
