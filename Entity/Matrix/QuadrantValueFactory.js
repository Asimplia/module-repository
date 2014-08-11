var QuadrantValueEnum = require('./QuadrantValueEnum');

var QuadrantValueFactory = (function () {
    function QuadrantValueFactory() {
    }
    QuadrantValueFactory.createQuadrantValueEnum = function (quadrant) {
        switch (parseInt(quadrant)) {
            case 1 /* RIGHT_TOP */:
                return 1 /* RIGHT_TOP */;
            case 2 /* LEFT_TOP */:
                return 2 /* LEFT_TOP */;
            case 3 /* RIGHT_BOTTOM */:
                return 3 /* RIGHT_BOTTOM */;
            case 4 /* LEFT_BOTTOM */:
                return 4 /* LEFT_BOTTOM */;
            case 6 /* RIGHT */:
                return 6 /* RIGHT */;
            case 5 /* LEFT */:
                return 5 /* LEFT */;
            case 8 /* BOTTOM */:
                return 8 /* BOTTOM */;
            case 7 /* TOP */:
                return 7 /* TOP */;
        }
        switch (quadrant) {
            case QuadrantValueEnum[1 /* RIGHT_TOP */]:
                return 1 /* RIGHT_TOP */;
            case QuadrantValueEnum[2 /* LEFT_TOP */]:
                return 2 /* LEFT_TOP */;
            case QuadrantValueEnum[3 /* RIGHT_BOTTOM */]:
                return 3 /* RIGHT_BOTTOM */;
            case QuadrantValueEnum[4 /* LEFT_BOTTOM */]:
                return 4 /* LEFT_BOTTOM */;
            case QuadrantValueEnum[6 /* RIGHT */]:
                return 6 /* RIGHT */;
            case QuadrantValueEnum[5 /* LEFT */]:
                return 5 /* LEFT */;
            case QuadrantValueEnum[8 /* BOTTOM */]:
                return 8 /* BOTTOM */;
            case QuadrantValueEnum[7 /* TOP */]:
                return 7 /* TOP */;
        }
        return 0 /* UNKNOWN */;
    };
    return QuadrantValueFactory;
})();
module.exports = QuadrantValueFactory;
