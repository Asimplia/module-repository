var each = require('each');
var _ = require('underscore');

var List = (function () {
    function List(items, entityFactory) {
        this.entities = [];
        if (typeof items !== 'undefined') {
            this.pushArray(items, entityFactory);
        }
    }
    List.prototype.pushArray = function (items, entityFactory) {
        var _this = this;
        if (typeof entityFactory === 'undefined') {
            entityFactory = function (entity) {
                return entity;
            };
        }
        if (!items) {
            return this;
        }
        items.forEach(function (item) {
            try  {
                _this.entities.push(entityFactory(item));
            } catch (e) {
                console.warn('Entity was deleted from List becouse error happened during create entity', item, e);
            }
        });
        return this;
    };

    List.prototype.push = function (item) {
        this.entities.push(item);
        return this;
    };

    List.prototype.toArray = function (objectFactory) {
        if (typeof objectFactory === 'undefined') {
            objectFactory = function (entity) {
                return entity;
            };
        }
        var array = [];
        this.entities.forEach(function (entity) {
            try  {
                array.push(objectFactory(entity));
            } catch (e) {
                console.warn('Entity was deleted from array becouse error happened during create object', entity, e);
            }
        });
        return array;
    };

    List.prototype.filter = function (cb) {
        return new List(_.filter(this.entities, cb), this.returnValue);
    };

    List.prototype.find = function (cb) {
        return _.find(this.entities, cb);
    };

    List.prototype.findOneOnly = function (cb) {
        if (this.filter(cb).count() > 1) {
            throw new Error('More items found');
        }
        return this.find(cb);
    };

    List.prototype.any = function (cb) {
        return _.any(this.entities, cb);
    };

    List.prototype.map = function (cb) {
        return new List(_.map(this.entities, cb), this.returnValue);
    };

    List.prototype.max = function (cb) {
        return _.max(this.entities, cb);
    };

    List.prototype.sortBy = function (cb) {
        return new List(_.sortBy(this.entities, cb), this.returnValue);
    };

    List.prototype.getListByMax = function (cb) {
        var maxEntity = this.max(cb);
        return this.filter(function (entity) {
            return cb(entity) == cb(maxEntity);
        });
    };

    List.prototype.all = function (cb) {
        return _.all(this.entities, cb);
    };

    List.prototype.forEach = function (cb) {
        this.entities.forEach(cb);
        return this;
    };

    List.prototype.count = function () {
        return this.entities.length;
    };

    List.prototype.isEmpty = function () {
        return this.count() == 0;
    };

    List.prototype.first = function () {
        return this.entities[0];
    };

    List.prototype.firstList = function (n) {
        return new List(_.first(this.entities, n), this.returnValue);
    };

    List.prototype.createEach = function () {
        return each(this.entities);
    };

    List.prototype.returnValue = function (entity) {
        return entity;
    };
    return List;
})();
module.exports = List;
