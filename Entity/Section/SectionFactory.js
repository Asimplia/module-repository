var SectionEnum = require('./SectionEnum');
var LocalizedString = require('../Locale/LocalizedString');

var SectionFactory = (function () {
    function SectionFactory() {
    }
    SectionFactory.createSectionEnum = function (section) {
        switch (section) {
            case SectionEnum[32 /* CUSTOMER */]:
                return 32 /* CUSTOMER */;
            case SectionEnum[33 /* MC1 */]:
                return 33 /* MC1 */;
            case SectionEnum[34 /* MC2 */]:
                return 34 /* MC2 */;
            case SectionEnum[35 /* MC3 */]:
                return 35 /* MC3 */;
            case SectionEnum[36 /* MC4 */]:
                return 36 /* MC4 */;
            case SectionEnum[37 /* MC5 */]:
                return 37 /* MC5 */;
            case SectionEnum[38 /* MC6 */]:
                return 38 /* MC6 */;
            case SectionEnum[39 /* MC7 */]:
                return 39 /* MC7 */;
            case SectionEnum[40 /* MC8 */]:
                return 40 /* MC8 */;
            case SectionEnum[41 /* MC9 */]:
                return 41 /* MC9 */;
            case SectionEnum[42 /* MC10 */]:
                return 42 /* MC10 */;
            case SectionEnum[43 /* MC11 */]:
                return 43 /* MC11 */;
            case SectionEnum[44 /* MC12 */]:
                return 44 /* MC12 */;
            case SectionEnum[45 /* MC13 */]:
                return 45 /* MC13 */;
            case SectionEnum[46 /* MC14 */]:
                return 46 /* MC14 */;
            case SectionEnum[47 /* MC15 */]:
                return 48 /* MC16 */;
            case SectionEnum[49 /* MC17 */]:
                return 49 /* MC17 */;
            case SectionEnum[50 /* MC18 */]:
                return 50 /* MC18 */;
            case SectionEnum[51 /* MC19 */]:
                return 51 /* MC19 */;
            case SectionEnum[52 /* MC20 */]:
                return 52 /* MC20 */;
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
            case SectionEnum[12 /* MP11 */]:
                return 12 /* MP11 */;
            case SectionEnum[13 /* MP12 */]:
                return 13 /* MP12 */;
            case SectionEnum[14 /* MP13 */]:
                return 14 /* MP13 */;
            case SectionEnum[15 /* MP14 */]:
                return 15 /* MP14 */;
            case SectionEnum[16 /* MP15 */]:
                return 16 /* MP15 */;
            case SectionEnum[17 /* MP16 */]:
                return 17 /* MP16 */;
            case SectionEnum[18 /* MP17 */]:
                return 18 /* MP17 */;
            case SectionEnum[19 /* MP18 */]:
                return 19 /* MP18 */;
            case SectionEnum[20 /* MP19 */]:
                return 20 /* MP19 */;
            case SectionEnum[21 /* MP20 */]:
                return 21 /* MP20 */;
            case SectionEnum[22 /* MGP1 */]:
                return 22 /* MGP1 */;
            case SectionEnum[23 /* MGP2 */]:
                return 23 /* MGP2 */;
            case SectionEnum[24 /* MGP3 */]:
                return 24 /* MGP3 */;
            case SectionEnum[25 /* MGP4 */]:
                return 25 /* MGP4 */;
            case SectionEnum[26 /* MGP5 */]:
                return 26 /* MGP5 */;
            case SectionEnum[27 /* MGP6 */]:
                return 27 /* MGP6 */;
            case SectionEnum[28 /* MGP7 */]:
                return 28 /* MGP7 */;
            case SectionEnum[29 /* MGP8 */]:
                return 29 /* MGP8 */;
            case SectionEnum[30 /* MGP9 */]:
                return 30 /* MGP9 */;
            case SectionEnum[31 /* MGP10 */]:
                return 31 /* MGP10 */;
            case SectionEnum[53 /* CHANNEL */]:
                return 53 /* CHANNEL */;
            case SectionEnum[54 /* MM1 */]:
                return 54 /* MM1 */;
            case SectionEnum[55 /* MM2 */]:
                return 55 /* MM2 */;
            case SectionEnum[56 /* MM3 */]:
                return 56 /* MM3 */;
            case SectionEnum[57 /* MM4 */]:
                return 57 /* MM4 */;
            case SectionEnum[58 /* MM5 */]:
                return 58 /* MM5 */;
            case SectionEnum[59 /* MM6 */]:
                return 59 /* MM6 */;
            case SectionEnum[60 /* MM7 */]:
                return 60 /* MM7 */;
            case SectionEnum[61 /* MM8 */]:
                return 61 /* MM8 */;
            case SectionEnum[62 /* MM9 */]:
                return 62 /* MM9 */;
            case SectionEnum[63 /* MM10 */]:
                return 63 /* MM10 */;
            case SectionEnum[64 /* MM11 */]:
                return 64 /* MM11 */;
            case SectionEnum[65 /* MM12 */]:
                return 65 /* MM12 */;
            case SectionEnum[66 /* MM13 */]:
                return 66 /* MM13 */;
            case SectionEnum[67 /* MM14 */]:
                return 67 /* MM14 */;
            case SectionEnum[68 /* MM15 */]:
                return 68 /* MM15 */;
            case SectionEnum[69 /* MM16 */]:
                return 69 /* MM16 */;
            case SectionEnum[70 /* MM17 */]:
                return 70 /* MM17 */;
            case SectionEnum[71 /* MM18 */]:
                return 71 /* MM18 */;
            case SectionEnum[72 /* MM19 */]:
                return 72 /* MM19 */;
            case SectionEnum[73 /* MM20 */]:
                return 73 /* MM20 */;
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
            case 12 /* MP11 */:
            case 13 /* MP12 */:
            case 14 /* MP13 */:
            case 15 /* MP14 */:
            case 16 /* MP15 */:
            case 17 /* MP16 */:
            case 18 /* MP17 */:
            case 19 /* MP18 */:
            case 20 /* MP19 */:
            case 21 /* MP20 */:
            case 22 /* MGP1 */:
            case 23 /* MGP2 */:
            case 24 /* MGP3 */:
            case 25 /* MGP4 */:
            case 26 /* MGP5 */:
            case 27 /* MGP6 */:
            case 28 /* MGP7 */:
            case 29 /* MGP8 */:
            case 30 /* MGP9 */:
            case 31 /* MGP10 */:
                return true;
        }
        return false;
    };

    SectionFactory.isCustomer = function (section) {
        switch (section) {
            case 32 /* CUSTOMER */:
            case 33 /* MC1 */:
            case 34 /* MC2 */:
            case 35 /* MC3 */:
            case 36 /* MC4 */:
            case 37 /* MC5 */:
            case 38 /* MC6 */:
            case 39 /* MC7 */:
            case 40 /* MC8 */:
            case 41 /* MC9 */:
            case 42 /* MC10 */:
            case 43 /* MC11 */:
            case 44 /* MC12 */:
            case 45 /* MC13 */:
            case 46 /* MC14 */:
            case 47 /* MC15 */:
            case 48 /* MC16 */:
            case 49 /* MC17 */:
            case 50 /* MC18 */:
            case 51 /* MC19 */:
            case 52 /* MC20 */:
                return true;
        }
        return false;
    };

    SectionFactory.isChannel = function (section) {
        switch (section) {
            case 53 /* CHANNEL */:
            case 54 /* MM1 */:
            case 55 /* MM2 */:
            case 56 /* MM3 */:
            case 57 /* MM4 */:
            case 58 /* MM5 */:
            case 59 /* MM6 */:
            case 60 /* MM7 */:
            case 61 /* MM8 */:
            case 62 /* MM9 */:
            case 63 /* MM10 */:
            case 64 /* MM11 */:
            case 65 /* MM12 */:
            case 66 /* MM13 */:
            case 67 /* MM14 */:
            case 68 /* MM15 */:
            case 69 /* MM16 */:
            case 70 /* MM17 */:
            case 71 /* MM18 */:
            case 72 /* MM19 */:
            case 73 /* MM20 */:
                return true;
        }
        return false;
    };

    SectionFactory.getLabel = function (section) {
        switch (true) {
            case SectionFactory.isProduct(section):
                return new LocalizedString({ cs: 'Produkt', en: 'Product' });
            case SectionFactory.isCustomer(section):
                return new LocalizedString({ cs: 'Zákazník', en: 'Customer' });
            case SectionFactory.isChannel(section):
                return new LocalizedString({ cs: 'Kanál', en: 'Channel' });
            default:
                return null;
        }
    };

    SectionFactory.getGroupSection = function (section) {
        if (this.isProduct(section)) {
            return 1 /* PRODUCT */;
        }
        if (this.isCustomer(section)) {
            return 32 /* CUSTOMER */;
        }
        if (this.isChannel(section)) {
            return 53 /* CHANNEL */;
        }
        return null;
    };
    return SectionFactory;
})();
module.exports = SectionFactory;
