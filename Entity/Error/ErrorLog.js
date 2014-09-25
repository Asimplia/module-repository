var ApplicationTypeEnum = require('./ApplicationTypeEnum');
var ErrorTypeEnum = require('./ErrorTypeEnum');
var EntityPreparer = require('../EntityPreparer');

var ErrorLog = (function () {
    function ErrorLog(applicationType, errorType, dateCreated, errorData) {
        this.applicationType = applicationType;
        this.errorType = errorType;
        this.dateCreated = dateCreated;
        this.errorData = errorData;
    }
    ErrorLog.fromObject = function (o) {
        return new ErrorLog(o.applicationType, o.errorType, EntityPreparer.date(o.dateCreated), o.errorData);
    };

    ErrorLog.toObject = function (e) {
        return {
            applicationType: ApplicationTypeEnum[e.applicationType],
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
