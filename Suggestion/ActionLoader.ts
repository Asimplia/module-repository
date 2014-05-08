/// <refernce path="../../typings/mongoose/mongoose.d.ts" />

import SuggestionAction = require('../Entity/Suggestion/Action');
import List = require('../Entity/List');
import mongoose = require('mongoose');

export = ActionLoader;
class ActionLoader {

	private ActionModel: mongoose.Model<mongoose.Document>;

	constructor() {
		this.ActionModel = require('./ActionModel');
	}

	getList(callback: (e: Error, actionList?: List<SuggestionAction>) => void) {
		this.ActionModel.find({}, null, { sort: 'id' }, (e, actions: mongoose.Document[]) => {
			if (e) {
				return callback(e);
			}
			var list = new List<SuggestionAction>();
			list.pushArray(actions, SuggestionAction.fromObject);
			callback(e, list);
		});
	}
}