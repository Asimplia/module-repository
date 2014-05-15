var LocalizedString = require('../Locale/LocalizedString');
var FactorDefinition = require('./FactorDefinition');

var Action = {
    id: Number,
    name: LocalizedString,
    shortName: LocalizedString,
    text: LocalizedString,
    section: String,
    factorDefinitions: [FactorDefinition],
    placeholders: [String],
    priorityType: String
};
module.exports = Action;
//# sourceMappingURL=Action.js.map
