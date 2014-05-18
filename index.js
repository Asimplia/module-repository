function connect(dsn) {
    require('mongoose').connect(dsn);
}

var Suggestion = require('./Suggestion/index');
var Factor = require('./Factor/index');
var Entity = require('./Entity/index');

var AsimpliaRepository = {
    connect: connect,
    Suggestion: Suggestion,
    Factor: Factor,
    Entity: Entity
};
module.exports = AsimpliaRepository;
//# sourceMappingURL=index.js.map
