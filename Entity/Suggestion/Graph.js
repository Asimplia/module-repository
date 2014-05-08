var Graph = (function () {
    function Graph(type, data) {
        this.type = type;
        this.data = data;
    }
    Graph.fromObject = function (object) {
        return new Graph(object.type, object.data);
    };
    return Graph;
})();
module.exports = Graph;
//# sourceMappingURL=Graph.js.map
