
import Checklist = require('./Checklist');
import EntityFilter = require('../Common/EntityFilter');
import IEntityFilter = require('../Common/IEntityFilter');

export = ChecklistFilter;
class ChecklistFilter extends EntityFilter<Checklist> implements IEntityFilter {

	private orderByDateCreated: number;

	set OrderByDateCreated(value: number) { this.orderByDateCreated = value; }
	get OrderByDateCreated() { return this.orderByDateCreated; }

	static fromObject(object: any) {
		var filter = new ChecklistFilter();
		if (typeof object.orderByDateCreated !== 'undefined') filter.orderByDateCreated = object.orderByDateCreated;
		return filter;
	}

	toObject() {
		var object: any = {};
		if (typeof this.orderByDateCreated !== 'undefined') object.orderByDateCreated = this.orderByDateCreated;
		return object;
	}
}
