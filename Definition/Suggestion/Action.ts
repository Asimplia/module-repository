
import LocalizedString = require('../Locale/LocalizedString');
import FactorDefinition = require('./FactorDefinition');

export = Action;
var Action = {
	id: Number,
	name: LocalizedString,
	text: LocalizedString,
	section: String,
	factorDefinitions: [FactorDefinition],
	placeholders: [String]
};
