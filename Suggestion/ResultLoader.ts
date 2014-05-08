
import SuggestionResult = require('../Entity/Suggestion/Result');
import List = require('../Entity/List');
import ResultTypeEnum = require('./ResultTypeEnum');
import ResultModel = require('./ResultModel');
import mongoose = require('mongoose');
import util = require('util');

export = ResultLoader;
class ResultLoader {

	private ResultModel: mongoose.Model<mongoose.Document>;

	constructor() {
		this.ResultModel = require('./ResultModel');
	}

	getById(id: number, callback: (e: Error, suggestion?: SuggestionResult) => void) {
		this.ResultModel.findOne({ id: id }, (e, suggestion: mongoose.Document) => {
			if (e) {
				return callback(e);
			}
			if (!suggestion) {
				return callback(new Error(util.format('Suggestion id=%s was not found', [id])));
			}
			callback(e, SuggestionResult.fromObject(suggestion));
		});
	}

	getListByType(type: ResultTypeEnum, callback: (e: Error, suggestion?: List<SuggestionResult>) => void): void {
		var conditions = this.getConditionsByType(type);
		this.ResultModel.find(conditions, (e, suggestions: mongoose.Document[]) => {
			if (e) {
				return callback(e);
			}
			var list = new List<SuggestionResult>();
			list.pushArray(suggestions, SuggestionResult.fromObject);
			callback(e, list);
		});
	}

	private getConditionsByType(type: ResultTypeEnum) {
		return {}; // @TODO
	}
}