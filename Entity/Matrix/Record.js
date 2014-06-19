﻿var Record = (function () {
    function Record(type, description) {
        this.type = type;
        this.description = description;
    }
    Object.defineProperty(Record.prototype, "Type", {
        get: function () {
            return this.type;
        },
        set: function (value) {
            this.type = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Record.prototype, "Description", {
        get: function () {
            return this.description;
        },
        set: function (value) {
            this.description = value;
        },
        enumerable: true,
        configurable: true
    });

    Record.prototype.toObject = function () {
        return {
            type: this.Type,
            description: this.Description
        };
    };
    return Record;
})();
module.exports = Record;
