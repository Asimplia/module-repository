var ScriptTypeEnum = require('../ScriptTypeEnum');
var _ = require('underscore');
var traceback = require('traceback');

var NotAllowedNull = (function () {
    function NotAllowedNull(type) {
        var stack = traceback();
        var backTraceMethods = _.map(_.first(stack, 15), function (trace) {
            return trace.name + ':L' + trace.line + ':C' + trace.col;
        });
        this.name = 'NotAllowedNull';
        this.message = 'Try to set value as NULL, only not null ' + ScriptTypeEnum[type] + ' allowed in "' + backTraceMethods.join('" -> "') + '"';
    }
    return NotAllowedNull;
})();
module.exports = NotAllowedNull;
