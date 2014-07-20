var AsimpliaRepository = require('../index');
var List = require('../Entity/List');
var Matrix = require('../Entity/Matrix/Matrix');
var Signal = require('../Entity/Matrix/Signal');
var MatrixProduct = require('../Entity/Matrix/MatrixProduct');

var SectionProvider = require('../Entity/Section/SectionProvider');

var MatrixLoader = (function () {
    function MatrixLoader() {
        var _this = this;
        AsimpliaRepository.getConnection(function (connection) {
            _this.connection = connection;
        });
    }
    MatrixLoader.prototype.getListByEShopId = function (eShopId, callback) {
        this.connection.query('SELECT * FROM analytical.' + Matrix.TABLE_NAME + ' LEFT JOIN analytical.' + Signal.TABLE_NAME + ' USING (' + Matrix.COLUMN_MATRIX_ID + ') ' + 'WHERE ' + Matrix.COLUMN_E_SHOP_ID + ' = $1 AND ' + Signal.COLUMN_SIGNAL_ID + ' IS NULL', [
            eShopId
        ], function (e, result) {
            if (e) {
                console.log(e);
                return callback(e);
            }
            var list = new List();
            result.rows.forEach(function (row) {
                var record = MatrixLoader.createMatrixFromRow(row);
                list.push(record);
            });
            callback(null, list);
        });
    };

    MatrixLoader.createMatrixFromRow = function (row) {
        var section = SectionProvider.createSectionEnum(row[Matrix.COLUMN_TYPE]);
        var matrix;
        if (SectionProvider.isProduct(section)) {
            matrix = MatrixProduct.fromRow(row);
        } else if (SectionProvider.isCustomer(section)) {
            matrix = MatrixProduct.fromRow(row);
        } else if (SectionProvider.isChannel(section)) {
            matrix = MatrixProduct.fromRow(row);
        } else {
            throw new Error('Not implemented');
        }
        return matrix;
    };
    return MatrixLoader;
})();
module.exports = MatrixLoader;
