var Matrix = require('./Matrix');
var MatrixProduct = require('./MatrixProduct');
var MatrixCustomer = require('./MatrixCustomer');
var MatrixChannel = require('./MatrixChannel');
var SectionProvider = require('../../Entity/Section/SectionProvider');

var MatrixFactory = (function () {
    function MatrixFactory() {
    }
    MatrixFactory.createMatrixFromRow = function (row) {
        var section = SectionProvider.createSectionEnum(row[Matrix.COLUMN_TYPE]);
        var matrix;
        if (SectionProvider.isProduct(section)) {
            matrix = MatrixProduct.fromRow(row);
        } else if (SectionProvider.isCustomer(section)) {
            matrix = MatrixCustomer.fromRow(row);
        } else if (SectionProvider.isChannel(section)) {
            matrix = MatrixChannel.fromRow(row);
        } else {
            throw new Error('Not implemented');
        }
        return matrix;
    };
    return MatrixFactory;
})();
module.exports = MatrixFactory;
