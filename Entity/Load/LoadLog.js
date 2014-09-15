var LoadLog = (function () {
    function LoadLog(id, eShopId, dateLoaded, result) {
        this.id = id;
        this.eShopId = eShopId;
        this.dateLoaded = dateLoaded;
        this.result = result;
    }
    Object.defineProperty(LoadLog.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadLog.prototype, "EShopId", {
        get: function () {
            return this.eShopId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadLog.prototype, "DateLoaded", {
        get: function () {
            return this.dateLoaded;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LoadLog.prototype, "Result", {
        get: function () {
            return this.result;
        },
        enumerable: true,
        configurable: true
    });

    LoadLog.toObject = function (e) {
        return {
            id: e.id,
            eShopId: e.eShopId,
            dateLoaded: e.dateLoaded,
            result: e.result
        };
    };

    LoadLog.prototype.toObject = function () {
        return LoadLog.toObject(this);
    };

    LoadLog.fromObject = function (o) {
        return new LoadLog(parseInt(o.id), parseInt(o.eShopId), o.dateLoaded, parseInt(o.result));
    };

    LoadLog.fromRow = function (r) {
        return new LoadLog(r[LoadLog.COLUMN_LOAD_LOG_ID], r[LoadLog.COLUMN_E_SHOP_ID], r[LoadLog.COLUMN_DATELOADED], r[LoadLog.COLUMN_RESULT]);
    };
    LoadLog.TABLE_NAME = 'loadlog';
    LoadLog.COLUMN_LOAD_LOG_ID = 'loadid';
    LoadLog.COLUMN_E_SHOP_ID = 'eshopid';
    LoadLog.COLUMN_DATELOADED = 'loaddate';
    LoadLog.COLUMN_RESULT = 'result';
    return LoadLog;
})();
module.exports = LoadLog;
