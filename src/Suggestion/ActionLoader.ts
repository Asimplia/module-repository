
import SuggestionAction = require('../Entity/Suggestion/Action');
import List = require('../Entity/List');
import Factor = require('../Entity/Factor/Factor');
import mongoose = require('mongoose');
import ActionModel = require('../Definition/Suggestion/ActionModel');
import DocumentExecutor = require('../Util/DocumentExecutor');
import SectionEnum = require('../Entity/Section/SectionEnum');
import _ = require('underscore');

export = ActionLoader;
class ActionLoader {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Suggestion.ActionModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, SuggestionAction);
	}

	getList(callback: (e: Error, actionList?: List<SuggestionAction>) => void) {
		this.model.find({}, null, { sort: 'id' }, (e, actions: mongoose.Document[]) => {
			if (e) {
				return callback(e);
			}
			var list = new List<SuggestionAction>();
			list.pushArray(actions, SuggestionAction.fromObject);
			callback(e, list);
		});
	}

	getListBySections(sections: SectionEnum[], callback: (e: Error, actionList?: List<SuggestionAction>) => void) {
		var conditions = {
			section: {
				$in: _.map(sections, (section: SectionEnum) => {
					return SectionEnum[section];
				})
			}
		};
		this.model.find(conditions, null, { sort: 'id' }, (e, actions: mongoose.Document[]) => {
			if (e) {
				return callback(e);
			}
			var list = new List<SuggestionAction>();
			list.pushArray(actions, SuggestionAction.fromObject);
			callback(e, list);
		});
	}

	getListByFactor(factor: Factor, callback: (e: Error, actionList?: List<SuggestionAction>) => void) {
		var condition = {
			"factorDefinitions.factor.id": factor.Id
		};
		this.model.find(condition, null, { sort: 'id' }, (e, actions: mongoose.Document[]) => {
			if (e) {
				return callback(e);
			}
			var list = new List<SuggestionAction>();
			list.pushArray(actions, SuggestionAction.fromObject);
			callback(e, list);
		});
	}
}
