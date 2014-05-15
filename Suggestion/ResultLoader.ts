/// <reference path="../typings/moment/moment.d.ts" />
import SuggestionResult = require('../Entity/Suggestion/Result');
import List = require('../Entity/List');
import ResultTypeEnum = require('./ResultTypeEnum');
import ResultModel = require('./ResultModel');
import mongoose = require('mongoose');
import util = require('util');
import moment = require('moment');

export = ResultLoader;
class ResultLoader {

	private ResultModel: mongoose.Model<mongoose.Document>;

	constructor() {
		this.ResultModel = require('./ResultModel');
	}

	getById(clientId: number, id: number, callback: (e: Error, suggestion?: SuggestionResult) => void) {
		this.ResultModel.findOne({ id: id, clientId: clientId }, (e, suggestion: mongoose.Document) => {
			if (e) {
				return callback(e);
			}
			if (!suggestion) {
				return callback(new Error(util.format('Suggestion id=%s was not found', [id])));
			}
			callback(e, SuggestionResult.fromObject(suggestion));
		});
	}

	getListByType(clientId: number, type: ResultTypeEnum, callback: (e: Error, suggestion?: List<SuggestionResult>) => void): void {
		var conditions = this.getConditionsByType(type);
		conditions.clientId = clientId;
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
		var conditions: any = {};
		var now = moment().toDate();
		switch (type) {
			case ResultTypeEnum.ACTUAL:
				conditions.activeStatus = {
					dateValidTo: {
						$gt: now
					}
				};
				break;
			case ResultTypeEnum.PAST:
				conditions.activeStatus = {
					dateValidTo: {
						$lt: now
					},
					state: 'USED'
				};
			case ResultTypeEnum.NOT_USED:
				conditions.activeStatus = {
					dateValidTo: {
						$lt: now
					}
				};
		}
		return conditions;
	}
}