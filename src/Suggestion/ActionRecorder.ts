
import SuggestionAction = require('../Entity/Suggestion/Action');
import mongoose = require('mongoose');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = ActionRecorder;
class ActionRecorder {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Suggestion.ActionModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, SuggestionAction);
	}

	insertOrUpdate(action: SuggestionAction, callback: (e: Error, action?: SuggestionAction) => void) {
		this.documentExecutor.insertOrUpdate(action, callback);
	}

	remove(id: number, callback: (e: Error) => void): void {
		this.model.findOneAndRemove({ id: id }, (e: Error) => {
			callback(e);
		});
	}

}
