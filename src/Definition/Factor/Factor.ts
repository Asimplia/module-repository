﻿/* tslint:disable */
import LocalizedString = require('../Locale/LocalizedString');

export = Factor;
var Factor = {
	id: Number,
	name: String,
	description: String,
	section: String,
	weight: Number,
	factorType: String,
	column: String,
	label: LocalizedString
};
