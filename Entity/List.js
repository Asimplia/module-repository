var List = (function () {
    function List() {
        this.entities = [];
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
    return List;
})();
module.exports = List;
