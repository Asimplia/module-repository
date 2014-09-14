﻿/// <reference path="../typings/mongoose/mongoose.d.ts" />

import SuggestionAction = require('../Entity/Suggestion/Action');
import List = require('../Entity/List');
import mongoose = require('mongoose');
import ActionModel = require('./ActionModel');

export = ActionLoader;
class ActionLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = ActionModel;
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
}
