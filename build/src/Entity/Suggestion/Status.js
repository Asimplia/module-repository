﻿var ResultStateEnum = require('./ResultStateEnum');
var moment = require('moment');
var EntityPreparer = require('../EntityPreparer');

var Status = (function () {
    function Status(dateCreated, dateValidTo, state, dateNextRemind, priorityValue, priorityType) {
        this.dateCreated = dateCreated;
        this.dateValidTo = dateValidTo;
        this.state = state;
        this.dateNextRemind = dateNextRemind;
        this.priorityValue = priorityValue;
        this.priorityType = priorityType;
    }
    Object.defineProperty(Status.prototype, "DateCreated", {
        get: function () {
            return this.dateCreated;
        },
        set: function (value) {
            this.dateCreated = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "DateValidTo", {
        get: function () {
            return this.dateValidTo;
        },
        set: function (value) {
            this.dateValidTo = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "State", {
        get: function () {
            return this.state;
        },
        set: function (value) {
            this.state = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "DateNextRemind", {
        get: function () {
            return this.dateNextRemind;
        },
        set: function (value) {
            this.dateNextRemind = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "PriorityValue", {
        get: function () {
            return this.priorityValue;
        },
        set: function (value) {
            this.priorityValue = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "PriorityType", {
        get: function () {
            return this.priorityType;
        },
        set: function (value) {
            this.priorityType = value;
        },
        enumerable: true,
        configurable: true
    });

    Status.fromObject = function (o) {
        return new Status(EntityPreparer.date(o.dateCreated), EntityPreparer.dateOrNull(o.dateValidTo), Status.createResultStateEnum(o.state), EntityPreparer.dateOrNull(o.dateNextRemind), EntityPreparer.float(o.priorityValue), EntityPreparer.string(o.priorityType));
    };

    Status.toObject = function (entity) {
        return {
            dateCreated: entity.dateCreated ? moment(entity.dateCreated).format() : null,
            dateValidTo: entity.dateValidTo ? moment(entity.dateValidTo).format() : null,
            state: ResultStateEnum[entity.state],
            dateNextRemind: entity.dateNextRemind ? moment(entity.dateNextRemind).format() : null,
            priorityValue: entity.priorityValue,
            priorityType: entity.priorityType
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
    return Status;
})();
module.exports = Status;