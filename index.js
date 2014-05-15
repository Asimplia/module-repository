var Repository;
(function (Repository) {
    function connect(dsn) {
        require('mongoose').connect(dsn);
    }
    Repository.connect = connect;
})(Repository || (Repository = {}));
module.exports = Repository;
//# sourceMappingURL=index.js.map
