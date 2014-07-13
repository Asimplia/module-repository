/// <reference path="../typings/mongoose/mongoose.d.ts" />

import AbstractRecorder = require('../AbstractRecorder');
import SuggestionAction = require('../Entity/Suggestion/Action');
import List = require('../Entity/List');
import mongoose = require('mongoose');

export = ActionRecorder;
class ActionRecorder extends AbstractRecorder {

	private ActionModel: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.ActionModel = require('./ActionModel');
	}

	insertOrUpdate(suggestionAction: SuggestionAction, callback: (e: Error, action?: SuggestionAction) => void): void {
		this.ActionModel.findOne({ id: suggestionAction.Id }, (e, actionDocument: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!actionDocument) {
				actionDocument = new this.ActionModel({});
				this.getNextId(this.ActionModel, (id) => {
					suggestionAction.Id = id;
					this.update(actionDocument, SuggestionAction.fromObject, suggestionAction, callback);
				});
				return;
			}
			this.update(actionDocument, SuggestionAction.fromObject, suggestionAction, callback);
		});
	}

	remove(id: number, callback: (e: Error) => void): void {
		this.ActionModel.findOneAndRemove({ id: id }, (e: Error) => {
			callback(e);
		});
	}

}
