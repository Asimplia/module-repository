var PriorityTypeEnum = require('./PriorityTypeEnum');

var PriorityTypeFactory = (function () {
    function PriorityTypeFactory() {
    }
    PriorityTypeFactory.createPriorityTypeEnum = function (priorityType) {
        switch (priorityType) {
            case PriorityTypeEnum[1 /* RED */]:
                return 1 /* RED */;
            case PriorityTypeEnum[2 /* GREEN */]:
                return 2 /* GREEN */;
        }
        return 0 /* UNKNOWN */;
    };
    return PriorityTypeFactory;
})();
module.exports = PriorityTypeFactory;
