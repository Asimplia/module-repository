﻿var LocalizedString = require('../Locale/LocalizedString');
var Status = require('./Status');
var Graph = require('./Graph');

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
module.exports = Result;
