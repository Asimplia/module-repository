﻿
import SuggestionResult = require('../Entity/Suggestion/Result');
import List = require('../Entity/List');
import ResultTypeEnum = require('./ResultTypeEnum');
import ResultStateEnum = require('../Entity/Suggestion/ResultStateEnum');
import SectionEnum = require('../Entity/Section/SectionEnum');
import mongoose = require('mongoose');
import moment = require('moment');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = ResultLoader;
class ResultLoader {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Suggestion.ResultModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, SuggestionResult);
	}

	getById(eShopId: number, id: number, callback: (e: Error, suggestion?: SuggestionResult) => void) {
		var conditions: any = { id: id };
		conditions.eShopId = eShopId;
		this.model.findOne(conditions, (e: Error, suggestion: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!suggestion) {
				return callback(new Error('Suggestion id=' + id + ' was not found'));
			}
			callback(e, SuggestionResult.fromObject(suggestion));
		});
	}

	getListByType(
		eShopId: number,
		limit: number,
		offset: number,
		type: ResultTypeEnum,
		callback: (e: Error, suggestion?: List<SuggestionResult>) => void)
	: void {
		var conditions = this.getConditionsByType(type);
		conditions.eShopId = eShopId;
		this.model.find(conditions).skip(offset).limit(limit).sort('-dateCreated').exec((e: Error, suggestions: mongoose.Document[]) => {
			if (e) {
				callback(e);
				return;
			}
			var list = new List<SuggestionResult>();
			list.pushArray(suggestions, SuggestionResult.fromObject);
			callback(e, list);
		});
	}

	getListByTypeIsMain(
		eShopId: number,
		section: SectionEnum,
		limit: number,
		offset: number,
		isMain: boolean,
		type: ResultTypeEnum,
		callback: (e: Error, suggestion?: List<SuggestionResult>) => void)
	: void {
		var conditions = this.getConditionsByType(type);
		conditions.eShopId = eShopId;
		if (section !== null && section != SectionEnum.UNKNOWN) {
			conditions.section = SectionEnum[section];
		}
		conditions.main = isMain;
		this.model.find(conditions).skip(offset).limit(limit).sort('-dateCreated').exec((e: Error, suggestions: mongoose.Document[]) => {
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
		if (eShopId) {
			conditions.eShopId = eShopId;
		}
		this.model.count(conditions, (e: Error, count: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(e, count);
		});
	}

	getCountByTypeIsMain(eShopId: number, type: ResultTypeEnum, isMain: boolean, callback: (e: Error, count?: number) => void): void {
		var conditions = this.getConditionsByType(type);
		conditions.eShopId = eShopId;
		conditions.main = isMain;
		this.model.count(conditions, (e: Error, count: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(e, count);
		});
	}

	getListBySituationIdsLimited(
		situationIds: number[],
		limit: number,
		offset: number,
		callback: (e: Error, recordList?: List<SuggestionResult>) => void
	) {
		var conditions: any = {};
		conditions.situationId = { $in: situationIds };
		this.model.find(conditions).skip(offset).limit(limit).exec((e: Error, suggestions: mongoose.Document[]) => {
			if (e) {
				callback(e);
				return;
			}
			var list = new List<SuggestionResult>();
			list.pushArray(suggestions, SuggestionResult.fromObject);
			callback(e, list);
		});
	}

	getDailyCount(countDays: number, callback: (e: Error, data?: { date: Date; count: number }[]) => void) {
		this.model.aggregate([
			{ $group: {
				_id: {
					year: { $year: '$dateCreated' },
					month: { $month: '$dateCreated' },
					day: { $dayOfMonth: '$dateCreated' }
				},
				count: {
					$sum: 1
				}
			} }
		]).exec((e: Error, rows: any[]) => {
			if (e) {
				callback(e);
				return;
			}
			var data = [];
			rows.forEach((row: any) => {
				data.unshift({
					date: new Date(row._id.year, row._id.month, row._id.day, 0, 0, 0),
					count: row.count
				});
			});
			callback(null, data);
		});
	}

	getListByProductId(
		eShopId: number, productId: number, type: ResultTypeEnum, callback: (e: Error, list?: List<SuggestionResult>) => void)
	: void {
		var conditions = this.getConditionsByType(type);
		conditions.eShopId = eShopId;
		conditions.productIds = productId;
		this.getList(conditions, callback);
	}

	getListByCustomerId(
		eShopId: number, customerId: number, type: ResultTypeEnum, callback: (e: Error, list?: List<SuggestionResult>) => void)
	: void {
		var conditions = this.getConditionsByType(type);
		conditions.eShopId = eShopId;
		conditions.customerIds = customerId;
		this.getList(conditions, callback);
	}

	getListByChannelId(
		eShopId: number, channelId: number, type: ResultTypeEnum, callback: (e: Error, list?: List<SuggestionResult>) => void)
	: void {
		var conditions = this.getConditionsByType(type);
		conditions.eShopId = eShopId;
		conditions.channelIds = channelId;
		this.getList(conditions, callback);
	}

	getListByCategoryId(
		eShopId: number, categoryId: number, type: ResultTypeEnum, callback: (e: Error, list?: List<SuggestionResult>) => void)
	: void {
		var conditions = this.getConditionsByType(type);
		conditions.eShopId = eShopId;
		conditions.categoryIds = categoryId;
		this.getList(conditions, callback);
	}

	private getList(conditions: any, callback: (e: Error, list?: List<SuggestionResult>) => void) {
		this.model.find(conditions).sort('-dateCreated').exec((e: Error, suggestions: mongoose.Document[]) => {
			if (e) {
				callback(e);
				return;
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
}
