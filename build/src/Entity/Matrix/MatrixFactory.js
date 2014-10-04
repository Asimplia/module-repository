var Matrix = require('./Matrix');
var MatrixProduct = require('./MatrixProduct');
var MatrixCustomer = require('./MatrixCustomer');
var MatrixChannel = require('./MatrixChannel');
var MatrixCategory = require('./MatrixCategory');
var SectionFactory = require('../../Entity/Section/SectionFactory');

var MatrixFactory = (function () {
    function MatrixFactory() {
    }
    MatrixFactory.createMatrixFromRow = function (row) {
        var section = SectionFactory.createSectionEnum(row[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SECTION]);
        var matrix;
        if (SectionFactory.isProduct(section)) {
            matrix = MatrixProduct.fromRow(row);
        } else if (SectionFactory.isCustomer(section)) {
            matrix = MatrixCustomer.fromRow(row);
        } else if (SectionFactory.isChannel(section)) {
            matrix = MatrixChannel.fromRow(row);
        } else if (SectionFactory.isCategory(section)) {
            matrix = MatrixCategory.fromRow(row);
        } else {
            throw new Error('Not implemented section "' + row[Matrix.TABLE_NAME + '.' + Matrix.COLUMN_SECTION] + '"');
        }
        return matrix;
    };
    return MatrixFactory;
})();
module.exports = MatrixFactory;
