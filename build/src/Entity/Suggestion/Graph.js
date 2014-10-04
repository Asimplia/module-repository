var Graph = (function () {
    function Graph(type, data) {
        this.type = type;
        this.data = data;
    }
    Graph.fromObject = function (object) {
        return new Graph(object.type, object.data);
    };

    Graph.toObject = function (entity) {
        return {
            type: entity.type,
            data: entity.data
        };
    };

    Graph.prototype.toObject = function () {
        return Graph.toObject(this);
    };
    return Graph;
})();
module.exports = Graph;
