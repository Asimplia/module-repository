var EntityPreparer = require('../EntityPreparer');
var SectionEnum = require('./SectionEnum');
var SectionFactory = require('./SectionFactory');

var MatrixType = (function () {
    function MatrixType(section, description, dateCreated) {
        this.section = section;
        this.description = description;
        this.dateCreated = dateCreated;
    }
    Object.defineProperty(MatrixType.prototype, "Section", {
        get: function () {
            return this.section;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatrixType.prototype, "Description", {
        get: function () {
            return this.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatrixType.prototype, "DateCreated", {
        get: function () {
            return this.dateCreated;
        },
        enumerable: true,
        configurable: true
    });

    MatrixType.toObject = function (e) {
        return {
            section: SectionEnum[e.section],
            description: e.description,
            dateCreated: e.dateCreated
        };
    };

    MatrixType.prototype.toObject = function () {
        return MatrixType.toObject(this);
    };

    MatrixType.fromObject = function (o) {
        return new MatrixType(SectionFactory.createSectionEnum(o.section), EntityPreparer.stringOrNull(o.description), EntityPreparer.date(o.dateCreated));
    };

    MatrixType.fromRow = function (r) {
        return new MatrixType(SectionFactory.createSectionEnum(r[MatrixType.TABLE_NAME + '.' + MatrixType.COLUMN_SECTION]), EntityPreparer.stringOrNull(r[MatrixType.TABLE_NAME + '.' + MatrixType.COLUMN_DESCRIPTION]), EntityPreparer.date(r[MatrixType.TABLE_NAME + '.' + MatrixType.COLUMN_DATE_CREATED]));
    };
    MatrixType.TABLE_NAME = 'analytical.cmatrix';
    MatrixType.COLUMN_SECTION = 'matrixtype';
    MatrixType.COLUMN_DESCRIPTION = 'description';
    MatrixType.COLUMN_DATE_CREATED = 'datecreated';
    return MatrixType;
})();
module.exports = MatrixType;
