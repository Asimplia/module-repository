var Status = (function () {
    function Status(dateCreated, dateValidTo, state, dateNextRemind, priorityValue, priorityType) {
        this.dateCreated = dateCreated;
        this.dateValidTo = dateValidTo;
        this.state = state;
        this.dateNextRemind = dateNextRemind;
        this.priorityValue = priorityValue;
        this.priorityType = priorityType;
    }
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
