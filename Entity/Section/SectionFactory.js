var SectionEnum = require('./SectionEnum');

var SectionFactory = (function () {
    function SectionFactory() {
    }
    SectionFactory.createSectionEnum = function (section) {
        switch (section) {
            case SectionEnum[12 /* CUSTOMER */]:
                return 12 /* CUSTOMER */;
            case SectionEnum[13 /* MC1 */]:
                return 13 /* MC1 */;
            case SectionEnum[14 /* MC2 */]:
                return 14 /* MC2 */;
            case SectionEnum[15 /* MC3 */]:
                return 15 /* MC3 */;
            case SectionEnum[1 /* PRODUCT */]:
                return 1 /* PRODUCT */;
            case SectionEnum[2 /* MP1 */]:
                return 2 /* MP1 */;
            case SectionEnum[3 /* MP2 */]:
                return 3 /* MP2 */;
            case SectionEnum[4 /* MP3 */]:
                return 4 /* MP3 */;
            case SectionEnum[5 /* MP4 */]:
                return 5 /* MP4 */;
            case SectionEnum[6 /* MP5 */]:
                return 6 /* MP5 */;
            case SectionEnum[7 /* MP6 */]:
                return 7 /* MP6 */;
            case SectionEnum[8 /* MP7 */]:
                return 8 /* MP7 */;
            case SectionEnum[9 /* MP8 */]:
                return 9 /* MP8 */;
            case SectionEnum[10 /* MP9 */]:
                return 10 /* MP9 */;
            case SectionEnum[11 /* MP10 */]:
                return 11 /* MP10 */;
            case SectionEnum[16 /* CHANNEL */]:
                return 16 /* CHANNEL */;
            case SectionEnum[17 /* MM1 */]:
                return 17 /* MM1 */;
            case SectionEnum[18 /* MM2 */]:
                return 18 /* MM2 */;
            case SectionEnum[19 /* MM3 */]:
                return 19 /* MM3 */;
        }
        return 0 /* UNKNOWN */;
    };

    SectionFactory.isProduct = function (section) {
        switch (section) {
            case 1 /* PRODUCT */:
            case 2 /* MP1 */:
            case 3 /* MP2 */:
            case 4 /* MP3 */:
            case 5 /* MP4 */:
            case 6 /* MP5 */:
            case 7 /* MP6 */:
            case 8 /* MP7 */:
            case 9 /* MP8 */:
            case 10 /* MP9 */:
            case 11 /* MP10 */:
                return true;
        }
        return false;
    };

    SectionFactory.isCustomer = function (section) {
        switch (section) {
            case 12 /* CUSTOMER */:
            case 13 /* MC1 */:
            case 14 /* MC2 */:
            case 15 /* MC3 */:
                return true;
        }
        return false;
    };

    SectionFactory.isChannel = function (section) {
        switch (section) {
            case 16 /* CHANNEL */:
            case 17 /* MM1 */:
            case 18 /* MM2 */:
            case 19 /* MM3 */:
                return true;
        }
        return false;
    };
    return SectionFactory;
})();
module.exports = SectionFactory;
