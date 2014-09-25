var ScriptTypeEnum = require('./ScriptTypeEnum');
var _ = require('underscore');
var stackTrace = require('stack-trace');

var NotAllowedNull = (function () {
    function NotAllowedNull(type) {
        var backTrace = stackTrace.get();
        var backTraceMethods = _.map(_.first(backTrace, 5), function (trace) {
            return trace.getFunctionName() + ':L' + trace.getLineNumber() + ':C' + trace.getColumnNumber();
        });
        this.name = 'NotAllowedNull';
        this.message = 'Try to set value as NULL, only not null ' + ScriptTypeEnum[type] + ' allowed in "' + backTraceMethods.join('" -> "') + '"';
    }
    return NotAllowedNull;
})();
module.exports = NotAllowedNull;
