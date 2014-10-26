var LocalizedString = require('../Locale/LocalizedString');
var Status = require('./Status');
var Graph = require('./Graph');
var Reason = require('./Reason');

var PlaceholderValue = {
    placeholder: String,
    value: Object
};

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
    section: String,
    main: Boolean,
    situationId: Number,
    actionId: Number,
    dateCreated: Date,
    priorityValue: Number,
    priorityType: String,
    productIds: [Number],
    customerIds: [Number],
    categoryIds: [Number],
    channelIds: [Number],
    placeholderValues: [PlaceholderValue]
};
module.exports = Result;
