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
            return this.dateCreated;
        },
        set: function (value) {
            this.dateCreated = value;
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
        return new Status(o.dateCreated, o.dateValidTo, o.state, o.dateNextRemind, o.priorityValue, o.priorityType);
    };

    Status.toObject = function (entity) {
        return {
            dateCreated: entity.dateCreated,
            dateValidTo: entity.dateValidTo,
            state: entity.state,
            dateNextRemind: entity.dateNextRemind,
            priorityValue: entity.priorityValue,
            priorityType: entity.priorityType
        };
    };

    Status.prototype.toObject = function () {
        return Status.toObject(this);
    };
    return Status;
})();
module.exports = Status;
//# sourceMappingURL=Status.js.map
