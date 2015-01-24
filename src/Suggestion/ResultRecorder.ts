
import Result = require('../Entity/Suggestion/Result');
import List = require('../Entity/List');
import mongoose = require('mongoose');
import ResultModel = require('../Definition/Suggestion/ResultModel');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = ResultRecorder;
class ResultRecorder {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Suggestion.ResultModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, Result);
	}

	insertOrUpdate(result: Result, callback: (e: Error, result?: Result) => void) {
		this.documentExecutor.insertOrUpdate(result, callback);
	}

	removeBySituationIds(situationIds: number[], callback: (e: Error) => void) {
		var conditions: any = {};
		conditions.situationId = { $in: situationIds };
		this.model.remove(conditions).exec((e: Error) => {
			callback(e);
		});
	}
}
