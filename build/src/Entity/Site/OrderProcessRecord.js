var EntityPreparer = require('../EntityPreparer');

var OrderProcessRecord = (function () {
    function OrderProcessRecord(id, eShopId, query, dateChanged, source, medium, campaign, pagePath, pageViews, uniquePageViews) {
        this.id = id;
        this.eShopId = eShopId;
        this.query = query;
        this.dateChanged = dateChanged;
        this.source = source;
        this.medium = medium;
        this.campaign = campaign;
        this.pagePath = pagePath;
        this.pageViews = pageViews;
        this.uniquePageViews = uniquePageViews;
    }
    OrderProcessRecord.prototype.toObject = function () {
        return OrderProcessRecord.toObject(this);
    };

    OrderProcessRecord.toObject = function (entity) {
        return {
            id: entity.id,
            eShopId: entity.eShopId,
            query: entity.query,
            dateChanged: entity.dateChanged,
            source: entity.source,
            medium: entity.medium,
            campaign: entity.campaign,
            pagePath: entity.pagePath,
            pageViews: entity.pageViews,
            uniquePageViews: entity.uniquePageViews
        };
    };

    OrderProcessRecord.fromObject = function (object) {
        return new OrderProcessRecord(EntityPreparer.intOrNull(object.id), EntityPreparer.int(object.eShopId), EntityPreparer.string(object.query), EntityPreparer.date(object.dateChanged), EntityPreparer.stringOrNull(object.source), EntityPreparer.stringOrNull(object.medium), EntityPreparer.stringOrNull(object.campaign), EntityPreparer.intOrNull(object.pagePath), EntityPreparer.intOrNull(object.pageViews), EntityPreparer.intOrNull(object.uniquePageViews));
    };

    OrderProcessRecord.fromRow = function (row) {
        return new OrderProcessRecord(EntityPreparer.intOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_ORDER_PROCESS_RECORD_ID]), EntityPreparer.int(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_E_SHOP_ID]), EntityPreparer.string(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_QUERY]), EntityPreparer.date(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_DATE_CHANGED]), EntityPreparer.stringOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_SOURCE]), EntityPreparer.stringOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_MEDIUM]), EntityPreparer.stringOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_CAMPAIGN]), EntityPreparer.intOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_PAGE_PATH]), EntityPreparer.intOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_PAGE_VIEWS]), EntityPreparer.intOrNull(row[OrderProcessRecord.TABLE_NAME + '.' + OrderProcessRecord.COLUMN_UNIQUE_PAGE_VIEWS]));
    };
    OrderProcessRecord.TABLE_NAME = 'warehouse.googleanalytics';
    OrderProcessRecord.COLUMN_ORDER_PROCESS_RECORD_ID = 'gaid';
    OrderProcessRecord.COLUMN_E_SHOP_ID = 'eshopid';
    OrderProcessRecord.COLUMN_QUERY = 'gaquery';
    OrderProcessRecord.COLUMN_DATE_CHANGED = 'datechanged';
    OrderProcessRecord.COLUMN_SOURCE = 'source';
    OrderProcessRecord.COLUMN_MEDIUM = 'medium';
    OrderProcessRecord.COLUMN_CAMPAIGN = 'campaign';
    OrderProcessRecord.COLUMN_PAGE_PATH = 'pagepath';
    OrderProcessRecord.COLUMN_PAGE_VIEWS = 'pageviews';
    OrderProcessRecord.COLUMN_UNIQUE_PAGE_VIEWS = 'uniquepageviews';
    return OrderProcessRecord;
})();
module.exports = OrderProcessRecord;
