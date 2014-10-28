var EntityPreparer = require('../EntityPreparer');

var VisitRecord = (function () {
    function VisitRecord(id, eShopId, query, dateChanged, source, medium, campaign, adContent, keyword, sessions, transactions, transactionRevenue, itemQuantity, bounces, newUsers) {
        this.id = id;
        this.eShopId = eShopId;
        this.query = query;
        this.dateChanged = dateChanged;
        this.source = source;
        this.medium = medium;
        this.campaign = campaign;
        this.adContent = adContent;
        this.keyword = keyword;
        this.sessions = sessions;
        this.transactions = transactions;
        this.transactionRevenue = transactionRevenue;
        this.itemQuantity = itemQuantity;
        this.bounces = bounces;
        this.newUsers = newUsers;
    }
    VisitRecord.prototype.toObject = function () {
        return VisitRecord.toObject(this);
    };

    VisitRecord.toObject = function (entity) {
        return {
            id: entity.id,
            eShopId: entity.eShopId,
            query: entity.query,
            dateChanged: entity.dateChanged,
            source: entity.source,
            medium: entity.medium,
            campaign: entity.campaign,
            adContent: entity.adContent,
            keyword: entity.keyword,
            sessions: entity.sessions,
            transactions: entity.transactions,
            transactionRevenue: entity.transactionRevenue,
            itemQuantity: entity.itemQuantity,
            bounces: entity.bounces,
            newUsers: entity.newUsers
        };
    };

    VisitRecord.fromObject = function (object) {
        return new VisitRecord(EntityPreparer.intOrNull(object.id), EntityPreparer.int(object.eShopId), EntityPreparer.string(object.query), EntityPreparer.date(object.dateChanged), EntityPreparer.stringOrNull(object.source), EntityPreparer.stringOrNull(object.medium), EntityPreparer.stringOrNull(object.campaign), EntityPreparer.stringOrNull(object.adContent), EntityPreparer.stringOrNull(object.keyword), EntityPreparer.intOrNull(object.sessions), EntityPreparer.floatOrNull(object.transactions), EntityPreparer.floatOrNull(object.transactionRevenue), EntityPreparer.intOrNull(object.itemQuantity), EntityPreparer.intOrNull(object.bounces), EntityPreparer.intOrNull(object.newUsers));
    };

    VisitRecord.fromRow = function (row) {
        return new VisitRecord(EntityPreparer.intOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_VISIT_RECORD_ID]), EntityPreparer.int(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_E_SHOP_ID]), EntityPreparer.string(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_QUERY]), EntityPreparer.date(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_DATE_CHANGED]), EntityPreparer.stringOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_SOURCE]), EntityPreparer.stringOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_MEDIUM]), EntityPreparer.stringOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_CAMPAIGN]), EntityPreparer.stringOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_AD_CONTENT]), EntityPreparer.stringOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_KEYWORD]), EntityPreparer.intOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_SESSIONS]), EntityPreparer.floatOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_TRANSACTIONS]), EntityPreparer.floatOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_TRANSACTION_REVENUE]), EntityPreparer.intOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_ITEM_QUANTITY]), EntityPreparer.intOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_BOUNCES]), EntityPreparer.intOrNull(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_NEW_USERS]));
    };
    VisitRecord.TABLE_NAME = 'warehouse.googleanalytics';
    VisitRecord.COLUMN_VISIT_RECORD_ID = 'gaid';
    VisitRecord.COLUMN_E_SHOP_ID = 'eshopid';
    VisitRecord.COLUMN_QUERY = 'gaquery';
    VisitRecord.COLUMN_DATE_CHANGED = 'datechanged';
    VisitRecord.COLUMN_SOURCE = 'source';
    VisitRecord.COLUMN_MEDIUM = 'medium';
    VisitRecord.COLUMN_CAMPAIGN = 'campaign';
    VisitRecord.COLUMN_AD_CONTENT = 'adcontent';
    VisitRecord.COLUMN_KEYWORD = 'keyword';
    VisitRecord.COLUMN_SESSIONS = 'sessions';
    VisitRecord.COLUMN_TRANSACTIONS = 'transactions';
    VisitRecord.COLUMN_TRANSACTION_REVENUE = 'transactionrevenue';
    VisitRecord.COLUMN_ITEM_QUANTITY = 'itemquantity';
    VisitRecord.COLUMN_BOUNCES = 'bounces';
    VisitRecord.COLUMN_NEW_USERS = 'newusers';
    return VisitRecord;
})();
module.exports = VisitRecord;
