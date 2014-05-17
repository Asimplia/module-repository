/// <reference path="../typings/moment/moment.d.ts" />
var SuggestionResult = require('../Entity/Suggestion/Result');
var List = require('../Entity/List');
var ResultTypeEnum = require('./ResultTypeEnum');

var util = require('util');
var moment = require('moment');

var ResultLoader = (function () {
    function ResultLoader() {
        this.ResultModel = require('./ResultModel');
    }
    ResultLoader.prototype.getById = function (clientId, id, callback) {
        var conditions = { id: id };
        conditions = this.condClient(conditions, clientId);
        this.ResultModel.findOne(conditions, function (e, suggestion) {
            if (e) {
                return callback(e);
            }
            if (!suggestion) {
                return callback(new Error(util.format('Suggestion id=%s was not found', [id])));
            }
            callback(e, SuggestionResult.fromObject(suggestion));
        });
    };

    ResultLoader.prototype.getListByType = function (clientId, type, callback) {
        var conditions = this.getConditionsByType(type);
        conditions = this.condClient(conditions, clientId);
        this.ResultModel.find(conditions, function (e, suggestions) {
            if (e) {
                return callback(e);
            }
            var list = new List();
            list.pushArray(suggestions, SuggestionResult.fromObject);
            callback(e, list);
        });
    };

    ResultLoader.prototype.getCountByType = function (clientId, type, callback) {
        var conditions = this.getConditionsByType(type);
        conditions = this.condClient(conditions, clientId);
        this.ResultModel.count(conditions, function (e, count) {
            if (e) {
                return callback(e);
            }
            callback(e, count);
        });
    };

    ResultLoader.prototype.getConditionsByType = function (type) {
        var conditions = {};
        var now = moment().toDate();
        switch (type) {
            case 1 /* ACTUAL */:
                conditions.activeStatus = {
                    dateValidTo: {
                        $gt: now
                    }
                };
                break;
            case 2 /* PAST */:
                conditions.activeStatus = {
                    dateValidTo: {
                        $lt: now
                    },
                    state: 'USED'
                };
            case 0 /* NOT_USED */:
                conditions.activeStatus = {
                    dateValidTo: {
                        $lt: now
                    }
                };
            case 3 /* ALL */:
        }
        return conditions;
    };

    ResultLoader.prototype.condClient = function (conditions, clientId) {
        if (clientId !== null) {
            conditions.clientId = clientId;
        }
        return conditions;
    };
    return ResultLoader;
})();
module.exports = ResultLoader;
