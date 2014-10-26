var ResultStateEnum = require('./ResultStateEnum');
var moment = require('moment');
var EntityPreparer = require('../EntityPreparer');

var Status = (function () {
    function Status(dateCreated, state) {
        this.dateCreated = dateCreated;
        this.state = state;
    }
    Object.defineProperty(Status.prototype, "DateCreated", {
        get: function () {
            return this.dateCreated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "State", {
        get: function () {
            return this.state;
        },
        enumerable: true,
        configurable: true
    });

    Status.fromObject = function (o) {
        return new Status(EntityPreparer.date(o.dateCreated), Status.createResultStateEnum(o.state));
    };

    Status.toObject = function (entity) {
        return {
            dateCreated: entity.dateCreated ? moment(entity.dateCreated).format() : null,
            state: ResultStateEnum[entity.state]
        };
    };

    Status.prototype.toObject = function () {
        return Status.toObject(this);
    };

    Status.createResultStateEnum = function (state) {
        switch (state) {
            case ResultStateEnum[4 /* CREATED */]:
                return 4 /* CREATED */;
            case ResultStateEnum[5 /* DECLINED */]:
                return 5 /* DECLINED */;
            case ResultStateEnum[2 /* READY_TO_APPLY */]:
                return 2 /* READY_TO_APPLY */;
            case ResultStateEnum[3 /* REMIND_LATER */]:
                return 3 /* REMIND_LATER */;
            case ResultStateEnum[1 /* USED */]:
                return 1 /* USED */;
            case ResultStateEnum[6 /* EXPIRED */]:
                return 6 /* EXPIRED */;
        }
        return 0 /* UNKNOWN */;
    };

    Status.prototype.isStateUsed = function () {
        return this.state == 1 /* USED */;
    };

    Status.prototype.isStateDeclined = function () {
        return this.state == 5 /* DECLINED */;
    };

    Status.prototype.isStateRemindLater = function () {
        return this.state == 3 /* REMIND_LATER */;
    };

    Status.prototype.isStateReadyToApply = function () {
        return this.state == 2 /* READY_TO_APPLY */;
    };

    Status.prototype.isStateCreated = function () {
        return this.state == 4 /* CREATED */;
    };

    Status.prototype.isStateExpired = function () {
        return this.state == 6 /* EXPIRED */;
    };
    return Status;
})();
module.exports = Status;
