var ServiceTypeEnum = require('./ServiceTypeEnum');
var ServiceTypeFactory = require('./ServiceTypeFactory');
var moment = require('moment');
var EntityPreparer = require('../EntityPreparer');

var ServiceConnection = (function () {
    function ServiceConnection(serviceType, dateCreated, info) {
        this.serviceType = serviceType;
        this.dateCreated = dateCreated;
        this.info = info;
    }
    Object.defineProperty(ServiceConnection.prototype, "ServiceType", {
        get: function () {
            return this.serviceType;
        },
        enumerable: true,
        configurable: true
    });

    ServiceConnection.prototype.toObject = function () {
        return ServiceConnection.toObject(this);
    };

    ServiceConnection.toObject = function (e) {
        return {
            serviceType: ServiceTypeEnum[e.serviceType],
            dateCreated: moment(e.dateCreated).format('YYYY-MM-DD'),
            info: e.info
        };
    };

    ServiceConnection.fromObject = function (o) {
        return new ServiceConnection(ServiceTypeFactory.createServiceTypeEnum(o.serviceType), EntityPreparer.date(o.dateCreated), o.info);
    };
    return ServiceConnection;
})();
module.exports = ServiceConnection;
