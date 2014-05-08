
import LocalizedString = require('../Locale/LocalizedString');
import Status = require('./Status');
import Graph = require('./Graph');

export = Result;
var Result = {
	id: Number,
	title: LocalizedString,
	shortTitle: LocalizedString,
	label: LocalizedString,
	text: LocalizedString,
	activeStatus: Status,
	statuses: [Status],
	graphs: [Graph]
};
