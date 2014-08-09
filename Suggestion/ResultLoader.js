var SuggestionResult = require('../Entity/Suggestion/Result');
var List = require('../Entity/List');
var ResultTypeEnum = require('./ResultTypeEnum');

var ResultStateEnum = require('../Entity/Suggestion/ResultStateEnum');

var util = require('util');
var moment = require('moment');

var ResultLoader = (function () {
    function ResultLoader() {
        this.ResultModel = require('./ResultModel');
    }
    ResultLoader.prototype.getById = function (eShopId, id, callback) {
        var conditions = { id: id };
        conditions = this.condClient(conditions, eShopId);
        this.ResultModel.findOne(conditions, function (e, suggestion) {
            if (e) {
                callback(e);
                return;
            }
            if (!suggestion) {
                return callback(new Error(util.format('Suggestion id=%s was not found', [id])));
            }
            callback(e, SuggestionResult.fromObject(suggestion));
        });
    };

    ResultLoader.prototype.getListByType = function (eShopId, limit, offset, type, callback) {
        var conditions = this.getConditionsByType(type);
        conditions = this.condClient(conditions, eShopId);
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
        conditions = this.condClient(conditions, eShopId);
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
        conditions = this.condClient(conditions, eShopId);
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
        conditions = this.condClient(conditions, eShopId);
        conditions.main = isMain;
        this.ResultModel.count(conditions, function (e, count) {
            if (e) {
                callback(e);
                return;
            }
            callback(e, count);
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

    ResultLoader.prototype.condClient = function (conditions, eShopId) {
        if (eShopId !== null) {
            conditions.eShopId = eShopId;
        }
        return conditions;
    };
    return ResultLoader;
})();
module.exports = ResultLoader;
