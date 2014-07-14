var each = require('each');
var _ = require('underscore');

var List = (function () {
    function List(items, entityFactory) {
        this.entities = [];
        if (typeof items !== 'undefined', typeof entityFactory !== 'undefined') {
            this.pushArray(items, entityFactory);
        }
    }
    List.prototype.pushArray = function (items, entityFactory) {
        var _this = this;
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

    List.prototype.map = function (cb) {
        return new List(_.map(this.entities, cb), this.returnValue);
    };

    List.prototype.all = function (cb) {
        return _.all(this.entities, cb);
    };

    List.prototype.forEach = function (cb) {
        this.entities.forEach(cb);
        return this;
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
