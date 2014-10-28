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
        return new VisitRecord(object.id, object.eShopId, object.query, object.dateChanged, object.source, object.medium, object.campaign, object.adContent, object.keyword, object.sessions, object.transactions, object.transactionRevenue, object.itemQuantity, object.bounces, object.newUsers);
    };

    VisitRecord.fromRow = function (row) {
        return new VisitRecord(row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_ID], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_E_SHOP_ID], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_QUERY], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_DATE_CHANGED], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_SOURCE], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_MEDIUM], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_CAMPAIGN], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_AD_CONTENT], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_KEYWORD], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_SESSIONS], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_TRANSACTIONS], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_TRANSACTION_REVENUE], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_ITEM_QUANTITY], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_BOUNCES], row[VisitRecord.TABLE_NAME + '.' + VisitRecord.COLUMN_NEW_USERS]);
    };
    VisitRecord.TABLE_NAME = 'googleanalytics';
    VisitRecord.COLUMN_ID = 'gaid';
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
