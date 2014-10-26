var List = require('../List');
var Signal = require('./Signal');
var MatrixProduct = require('./MatrixProduct');
var MatrixCategory = require('./MatrixCategory');
var MatrixChannel = require('./MatrixChannel');
var MatrixCustomer = require('./MatrixCustomer');

var EntityPreparer = require('../EntityPreparer');

var Situation = (function () {
    function Situation(id, signalList, dateCreated, dateSuggestionResultCreated, dateSuggestionResultProcessed) {
        this.id = id;
        this.signalList = signalList;
        this.dateCreated = dateCreated;
        this.dateSuggestionResultCreated = dateSuggestionResultCreated;
        this.dateSuggestionResultProcessed = dateSuggestionResultProcessed;
    }
    Object.defineProperty(Situation.prototype, "Id", {
        get: function () {
            return this.id;
        },
        set: function (id) {
            this.id = id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "DateCreated", {
        get: function () {
            return this.dateCreated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "SignalList", {
        get: function () {
            return this.signalList;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "DateSuggestionResultCreated", {
        get: function () {
            return this.dateSuggestionResultCreated;
        },
        set: function (value) {
            this.dateSuggestionResultCreated = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "DateSuggestionResultProcessed", {
        get: function () {
            return this.dateSuggestionResultProcessed;
        },
        set: function (value) {
            this.dateSuggestionResultProcessed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "EShopId", {
        get: function () {
            return this.signalList.first().Matrix.EShopId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "ProductId", {
        get: function () {
            if (!(this.signalList.first().Matrix instanceof MatrixProduct)) {
                return null;
            }
            var productMatrix = this.signalList.first().Matrix;
            return productMatrix.Product.Id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "CategoryId", {
        get: function () {
            if (!(this.signalList.first().Matrix instanceof MatrixCategory)) {
                return null;
            }
            var categoryMatrix = this.signalList.first().Matrix;
            return categoryMatrix.Category.Id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "ChannelId", {
        get: function () {
            if (!(this.signalList.first().Matrix instanceof MatrixChannel)) {
                return null;
            }
            var channelMatrix = this.signalList.first().Matrix;
            return channelMatrix.Channel.Id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Situation.prototype, "CustomerId", {
        get: function () {
            if (!(this.signalList.first().Matrix instanceof MatrixCustomer)) {
                return null;
            }
            var customerMatrix = this.signalList.first().Matrix;
            return customerMatrix.Customer.Id;
        },
        enumerable: true,
        configurable: true
    });

    Situation.toObject = function (entity) {
        return {
            id: entity.id,
            dateCreated: entity.dateCreated,
            dateSuggestionResultCreated: entity.dateSuggestionResultCreated,
            dateSuggestionResultProcessed: entity.dateSuggestionResultProcessed,
            signals: entity.signalList.toArray(Signal.toObject)
        };
    };

    Situation.prototype.toObject = function () {
        return Situation.toObject(this);
    };
    Situation.fromRow = function (r) {
        return new Situation(EntityPreparer.intOrNull(r[Situation.TABLE_NAME + '.' + Situation.COLUMN_SITUATION_ID]), new List(), EntityPreparer.date(r[Situation.TABLE_NAME + '.' + Situation.COLUMN_DATE_CREATED]), EntityPreparer.dateOrNull(r[Situation.TABLE_NAME + '.' + Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED]), EntityPreparer.dateOrNull(r[Situation.TABLE_NAME + '.' + Situation.COLUMN_DATE_SUGGESTION_RESULT_PROCESSED]));
    };

    Situation.prototype.getMatrixProductBySection = function (section) {
        var signal = this.signalList.find(function (signal) {
            return signal.Matrix.Section == section;
        });
        return signal ? signal.Matrix : null;
    };
    Situation.TABLE_NAME = 'analytical.situation';
    Situation.COLUMN_SITUATION_ID = 'situationid';
    Situation.COLUMN_DATE_CREATED = 'datecreated';
    Situation.COLUMN_DATE_SUGGESTION_RESULT_CREATED = 'datesuggestionresultcreated';
    Situation.COLUMN_DATE_SUGGESTION_RESULT_PROCESSED = 'datesuggestionresultprocessed';
    return Situation;
})();
module.exports = Situation;
