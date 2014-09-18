var TypeEnum = require('./TypeEnum');

var NotAllowedNull = (function () {
    function NotAllowedNull(type) {
        this.name = 'NotAllowedNull';
        this.message = 'Try to set value as NULL, only not null ' + TypeEnum[type] + ' allowed';
    }
    return NotAllowedNull;
})();
module.exports = NotAllowedNull;
