﻿var SuggestionResult = require('../Entity/Suggestion/Result');
var List = require('../Entity/List');
var ResultTypeEnum = require('./ResultTypeEnum');
var ResultModel = require('./ResultModel');
var ResultStateEnum = require('../Entity/Suggestion/ResultStateEnum');

var moment = require('moment');

var ResultLoader = (function () {
    function ResultLoader() {
        this.ResultModel = ResultModel;
    }
    ResultLoader.prototype.getById = function (eShopId, id, callback) {
        var conditions = { id: id };
        conditions.eShopId = eShopId;
        this.ResultModel.findOne(conditions, function (e, suggestion) {
            if (e) {
                callback(e);
                return;
            }
            if (!suggestion) {
                return callback(new Error('Suggestion id=' + id + ' was not found'));
            }
            callback(e, SuggestionResult.fromObject(suggestion));
        });
    };

    ResultLoader.prototype.getListByType = function (eShopId, limit, offset, type, callback) {
        var conditions = this.getConditionsByType(type);
        conditions.eShopId = eShopId;
        this.ResultModel.find(conditions).skip(offset).limit(limit).sort("-activeStatus.dateCreated").exec(function (e, suggestions) {
            if (e) {
                callback(e);
                return;
            }
            var list = new List();
            list.pushArray(suggestions, SuggestionResult.fromObject);
            callback(e, list);
        });
    };

    ResultLoader.prototype.getListByTypeIsMain = function (eShopId, limit, offset, isMain, type, callback) {
        var conditions = this.getConditionsByType(type);
        conditions.eShopId = eShopId;
        conditions.main = isMain;
        this.ResultModel.find(conditions).skip(offset).limit(limit).sort("-activeStatus.dateCreated").exec(function (e, suggestions) {
            if (e) {
                callback(e);
                return;
            }
            var list = new List();
            list.pushArray(suggestions, SuggestionResult.fromObject);
            callback(e, list);
        });
    };

    ResultLoader.prototype.getCountByType = function (eShopId, type, callback) {
        var conditions = this.getConditionsByType(type);
        if (eShopId) {
            conditions.eShopId = eShopId;
        }
        this.ResultModel.count(conditions, function (e, count) {
            if (e) {
                callback(e);
                return;
            }
            callback(e, count);
        });
    };

    ResultLoader.prototype.getCountByTypeIsMain = function (eShopId, type, isMain, callback) {
        var conditions = this.getConditionsByType(type);
        conditions.eShopId = eShopId;
        conditions.main = isMain;
        this.ResultModel.count(conditions, function (e, count) {
            if (e) {
                callback(e);
                return;
            }
            callback(e, count);
        });
    };

    ResultLoader.prototype.getListBySituationIdsLimited = function (situationIds, limit, offset, callback) {
        var conditions = {};
        conditions.situationId = { $in: situationIds };
        this.ResultModel.find(conditions).skip(offset).limit(limit).exec(function (e, suggestions) {
            if (e) {
                callback(e);
                return;
            }
            var list = new List();
            list.pushArray(suggestions, SuggestionResult.fromObject);
            callback(e, list);
        });
    };

    ResultLoader.prototype.getDailyCount = function (countDays, callback) {
        this.ResultModel.aggregate([
            { $group: {
                    _id: {
                        year: { $year: '$activeStatus.dateCreated' },
                        month: { $month: "$activeStatus.dateCreated" },
                        day: { $dayOfMonth: "$activeStatus.dateCreated" }
                    },
                    count: {
                        $sum: 1
                    }
                } }
        ]).exec(function (e, rows) {
            if (e) {
                callback(e);
                return;
            }
            var data = [];
            rows.forEach(function (row) {
                data.unshift({
                    date: new Date(row._id.year, row._id.month, row._id.day, 0, 0, 0),
                    count: row.count
                });
            });
            callback(null, data);
        });
    };

    ResultLoader.prototype.getConditionsByType = function (type) {
        var conditions = {};
        var now = moment().toDate();
        switch (type) {
            case 1 /* ACTUAL */:
                conditions['activeStatus.dateValidTo'] = {
                    $gt: now
                };
                conditions['activeStatus.dateNextRemind'] = {
                    $lt: now
                };
                break;
            case 4 /* REMIND */:
                conditions['activeStatus.dateValidTo'] = {
                    $gt: now
                };
                conditions['activeStatus.dateNextRemind'] = {
                    $gt: now
                };
                break;
            case 2 /* PAST */:
                conditions['activeStatus.dateValidTo'] = {
                    $lt: now
                };
                conditions['activeStatus.state'] = {
                    $in: [ResultStateEnum[1 /* USED */], ResultStateEnum[2 /* READY_TO_APPLY */]]
                };
                break;
            case 0 /* NOT_USED */:
                conditions['activeStatus.dateValidTo'] = {
                    $lt: now
                };
                conditions['activeStatus.state'] = {
                    $nin: [ResultStateEnum[1 /* USED */], ResultStateEnum[2 /* READY_TO_APPLY */]]
                };
                break;
            case 3 /* ALL */:
                break;
        }
        return conditions;
    };
    return ResultLoader;
})();
module.exports = ResultLoader;