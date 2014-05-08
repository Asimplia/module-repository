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
    return Status;
})();
module.exports = Status;
//# sourceMappingURL=Status.js.map
