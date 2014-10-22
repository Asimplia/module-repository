var List = require('../List');
var LocalizedString = require('../Locale/LocalizedString');

var QuadrantDescription = require('./QuadrantDescription');
var SectionEnum = require('../Section/SectionEnum');
var SectionFactory = require('../Section/SectionFactory');

var MatrixDescription = (function () {
    function MatrixDescription(section, icon, description, quadrantDescriptionList) {
        this.section = section;
        this.icon = icon;
        this.description = description;
        this.quadrantDescriptionList = quadrantDescriptionList;
    }
    Object.defineProperty(MatrixDescription.prototype, "Section", {
        get: function () {
            return this.section;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatrixDescription.prototype, "Description", {
        get: function () {
            return this.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatrixDescription.prototype, "Icon", {
        get: function () {
            return this.icon;
        },
        enumerable: true,
        configurable: true
    });

    MatrixDescription.prototype.getQuadrantDescription = function (quadrant) {
        return this.quadrantDescriptionList.findOneOnly(function (quadrantDescription) {
            return quadrantDescription.Quadrant == quadrant;
        });
    };

    MatrixDescription.prototype.toObject = function () {
        return MatrixDescription.toObject(this);
    };

    MatrixDescription.toObject = function (entity) {
        return {
            section: SectionEnum[entity.section],
            icon: entity.icon,
            description: entity.description.toObject(),
            quadrantDescriptions: entity.quadrantDescriptionList.toArray(QuadrantDescription.toObject)
        };
    };

    MatrixDescription.fromObject = function (object) {
        return new MatrixDescription(SectionFactory.createSectionEnum(object.section), object.icon, new LocalizedString(object.description), new List(object.quadrantDescriptions, QuadrantDescription.fromObject));
    };
    return MatrixDescription;
})();
module.exports = MatrixDescription;
