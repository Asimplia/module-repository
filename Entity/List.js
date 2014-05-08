﻿var List = (function () {
    function List() {
        this.entities = [];
    }
    List.prototype.pushArray = function (items, entityFactory) {
        var _this = this;
        items.forEach(function (item) {
            _this.entities.push(entityFactory(item));
        });
        return this;
    };

    List.prototype.push = function (item) {
        this.entities.push(item);
        return this;
    };

    List.prototype.toArray = function () {
        return this.entities;
    };
    return List;
})();
module.exports = List;
//# sourceMappingURL=List.js.map
