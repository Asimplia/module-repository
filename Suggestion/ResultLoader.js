var SuggestionResult = require('../Entity/Suggestion/Result');
var List = require('../Entity/List');

var util = require('util');

var ResultLoader = (function () {
    function ResultLoader() {
        this.ResultModel = require('./ResultModel');
    }
    ResultLoader.prototype.getById = function (id, callback) {
        this.ResultModel.findOne({ id: id }, function (e, suggestion) {
            if (e) {
                return callback(e);
            }
            if (!suggestion) {
                return callback(new Error(util.format('Suggestion id=%s was not found', [id])));
            }
            callback(e, SuggestionResult.fromObject(suggestion));
        });
    };

    ResultLoader.prototype.getListByType = function (type, callback) {
        var conditions = this.getConditionsByType(type);
        this.ResultModel.find(conditions, function (e, suggestions) {
            if (e) {
                return callback(e);
            }
            var list = new List();
            list.pushArray(suggestions, SuggestionResult.fromObject);
            callback(e, list);
        });
    };

    ResultLoader.prototype.getConditionsByType = function (type) {
        return {};
    };
    return ResultLoader;
})();
module.exports = ResultLoader;
