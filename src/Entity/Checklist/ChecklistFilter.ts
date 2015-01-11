
import Checklist = require('./Checklist');
import EntityFilter = require('../Common/EntityFilter');
import IEntityFilter = require('../Common/IEntityFilter');

export = ChecklistFilter;
class ChecklistFilter extends EntityFilter<Checklist> implements IEntityFilter {

	static fromObject(object: any) {
		var filter = new ChecklistFilter();
		return filter;
	}
	
	toObject() {
		return {};
	}
}
