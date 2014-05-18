/// <reference path="../../../typings/moment/moment.d.ts" />
/// <reference path="../../../typings/mongoose/mongoose.d.ts" />

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
		var conditions = { id: id };
		conditions = this.condClient(conditions, clientId);
		this.ResultModel.findOne(conditions, (e, suggestion: mongoose.Document) => {
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
		conditions = this.condClient(conditions, clientId);
		this.ResultModel.find(conditions, (e, suggestions: mongoose.Document[]) => {
			if (e) {
				return callback(e);
			}
			var list = new List<SuggestionResult>();
			list.pushArray(suggestions, SuggestionResult.fromObject);
			callback(e, list);
		});
	}

	getCountByType(clientId: number, type: ResultTypeEnum, callback: (e: Error, count?: number) => void): void {
		var conditions = this.getConditionsByType(type);
		conditions = this.condClient(conditions, clientId);
		this.ResultModel.count(conditions, (e, count: number) => {
			if (e) {
				return callback(e);
			}
			callback(e, count);
		});
	}

	private getConditionsByType(type: ResultTypeEnum) {
		var conditions: any = {};
		var now = moment().toDate();
		switch (type) {
			case ResultTypeEnum.ACTUAL:
				conditions['activeStatus.dateValidTo'] = {
					$gt: now
				};
				break;
			case ResultTypeEnum.PAST:
				conditions['activeStatus.dateValidTo'] = {
					$lt: now
				};
				conditions['activeStatus.state'] = 'USED';
				break;
			case ResultTypeEnum.NOT_USED:
				conditions['activeStatus.dateValidTo'] = {
					$lt: now
				};
				conditions['activeStatus.state'] = {
					$ne: 'USED'
				};
				break;
			case ResultTypeEnum.ALL:
				break;
		}
		return conditions;
	}

	private condClient(conditions: any, clientId: number) {
		if (clientId !== null) {
			conditions.clientId = clientId;
		}
		return conditions;
	}
}