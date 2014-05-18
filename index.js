function connect(dsn) {
    require('mongoose').connect(dsn);
}
exports.connect = connect;
var Suggestion = require('./Suggestion/index');
exports.Suggestion = Suggestion;
var Factor = require('./Factor/index');
exports.Factor = Factor;
var Entity = require('./Entity/index');
exports.Entity = Entity;
//# sourceMappingURL=index.js.map
