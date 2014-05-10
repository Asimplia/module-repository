/// <refernce path="../../typings/mongoose/mongoose.d.ts" />

import SuggestionAction = require('../Entity/Suggestion/Action');
import List = require('../Entity/List');
import mongoose = require('mongoose');

export = ActionRecorder;
class ActionRecorder {

	private ActionModel: mongoose.Model<mongoose.Document>;

	constructor() {
		this.ActionModel = require('./ActionModel');
	}

	insertOrUpdate(suggestionAction: SuggestionAction, callback: (e: Error, action?: SuggestionAction) => void): void {
		this.ActionModel.findOne({ id: suggestionAction.Id }, (e, actionObject: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!actionObject) {
				actionObject = new this.ActionModel({});
				this.getNextId((id) => {
					actionObject.set('id', id);
					this.update(actionObject, suggestionAction, callback);
				})
				return;
			}
			this.update(actionObject, suggestionAction, callback);
		});
	}

	remove(id: number, callback: (e: Error) => void): void {
		this.ActionModel.findOneAndRemove({ id: id }, (e: Error) => {
			callback(e);
		});
	}

	private update(actionObject, suggestionAction: SuggestionAction, callback: (e: Error, action?: SuggestionAction) => void) {
		var action = suggestionAction.toObject();
		actionObject.set('name', action.name);
		actionObject.set('text', action.text);
		actionObject.set('section', action.section);
		actionObject.set('factorDefinitions', action.factorDefinitions);
		actionObject.set('placeholders', action.placeholders);

		actionObject.save((e, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, SuggestionAction.fromObject(actionObject));
		});
	}

	private getNextId(callback: (id: number) => void) {
		this.ActionModel.findOne({}, { 'id': true }, { sort: '-id' }, (e, action) => {
			if (!action) {
				callback(1);
				return;
			}
			callback(1 + parseInt(action.id));
		});
	}
}