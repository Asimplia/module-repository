var ErrorTypeEnum = require('./ErrorTypeEnum');
var EntityPreparer = require('../EntityPreparer');

var ErrorLog = (function () {
    function ErrorLog(errorType, dateCreated, errorData) {
        this.errorType = errorType;
        this.dateCreated = dateCreated;
        this.errorData = errorData;
    }
    ErrorLog.fromObject = function (o) {
        return new ErrorLog(o.errorType, EntityPreparer.date(o.dateCreated), o.errorData);
    };

    ErrorLog.toObject = function (e) {
        return {
            errorType: ErrorTypeEnum[e.errorType],
            dateCreated: EntityPreparer.fromDate(e.dateCreated),
            errorData: e.errorData
        };
    };

    ErrorLog.prototype.toObject = function () {
        return ErrorLog.toObject(this);
    };
    return ErrorLog;
})();
module.exports = ErrorLog;
