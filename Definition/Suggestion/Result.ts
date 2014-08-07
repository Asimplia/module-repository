
import LocalizedString = require('../Locale/LocalizedString');
import Status = require('./Status');
import Graph = require('./Graph');
import Reason = require('./Reason');

export = Result;
var Result = {
	id: Number,
	title: LocalizedString,
	shortTitle: LocalizedString,
	label: LocalizedString,
	text: LocalizedString,
	activeStatus: Status,
	statuses: [Status],
	graphs: [Graph],
	eShopId: Number,
	reasons: [Reason],
	section: String
};
