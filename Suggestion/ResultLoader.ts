/// <reference path="../typings/moment/moment.d.ts" />
/// <reference path="../typings/mongoose/mongoose.d.ts" />

import SuggestionResult = require('../Entity/Suggestion/Result');
import List = require('../Entity/List');
import ResultTypeEnum = require('./ResultTypeEnum');
import ResultModel = require('./ResultModel');
import ResultStateEnum = require('../Entity/Suggestion/ResultStateEnum');
import mongoose = require('mongoose');
import util = require('util');
import moment = require('moment');

export = ResultLoader;
class ResultLoader {

	private ResultModel: mongoose.Model<mongoose.Document>;

	constructor() {
		this.ResultModel = require('./ResultModel');
	}

	getById(eShopId: number, id: number, callback: (e: Error, suggestion?: SuggestionResult) => void) {
		var conditions = { id: id };
		conditions = this.condClient(conditions, eShopId);
		this.ResultModel.findOne(conditions, (e, suggestion: mongoose.Document) => {
			if (e) {
				callback(e);
				return
			}
			if (!suggestion) {
				return callback(new Error(util.format('Suggestion id=%s was not found', [id])));
			}
			callback(e, SuggestionResult.fromObject(suggestion));
		});
	}

	getListByType(eShopId: number, limit: number, offset: number, type: ResultTypeEnum, callback: (e: Error, suggestion?: List<SuggestionResult>) => void): void {
		var conditions = this.getConditionsByType(type);
		conditions = this.condClient(conditions, eShopId);
		this.ResultModel.find(conditions).skip(offset).limit(limit).sort("-activeStatus.dateCreated").exec((e, suggestions: mongoose.Document[]) => {
			if (e) {
				callback(e);
				return;
			}
			var list = new List<SuggestionResult>();
			list.pushArray(suggestions, SuggestionResult.fromObject);
			callback(e, list);
		});
	}

	getCountByType(eShopId: number, type: ResultTypeEnum, callback: (e: Error, count?: number) => void): void {
		var conditions = this.getConditionsByType(type);
		conditions = this.condClient(conditions, eShopId);
		this.ResultModel.count(conditions, (e, count: number) => {
			if (e) {
				callback(e);
				return;
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
				conditions['activeStatus.dateNextRemind'] = {
					$lt: now
				};
				break;
			case ResultTypeEnum.REMIND:
				conditions['activeStatus.dateValidTo'] = {
					$gt: now
				};
				conditions['activeStatus.dateNextRemind'] = {
					$gt: now
				};
				break;
			case ResultTypeEnum.PAST:
				conditions['activeStatus.dateValidTo'] = {
					$lt: now
				};
				conditions['activeStatus.state'] = {
					$in: [ResultStateEnum[ResultStateEnum.USED], ResultStateEnum[ResultStateEnum.READY_TO_APPLY]]
				};
				break;
			case ResultTypeEnum.NOT_USED:
				conditions['activeStatus.dateValidTo'] = {
					$lt: now
				};
				conditions['activeStatus.state'] = {
					$nin: [ResultStateEnum[ResultStateEnum.USED], ResultStateEnum[ResultStateEnum.READY_TO_APPLY]]
				};
				break;
			case ResultTypeEnum.ALL:
				break;
		}
		return conditions;
	}

	private condClient(conditions: any, eShopId: number) {
		if (eShopId !== null) {
			conditions.eShopId = eShopId;
		}
		return conditions;
	}
}