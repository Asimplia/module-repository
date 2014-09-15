var List = require('../List');
var ServiceConnection = require('./ServiceConnection');

var moment = require('moment');

var EShop = (function () {
    function EShop(id, name, serviceConnectionList) {
        this.id = id;
        this.name = name;
        this.serviceConnectionList = serviceConnectionList;
    }
    Object.defineProperty(EShop.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EShop.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });

    EShop.prototype.toObject = function () {
        return EShop.toObject(this);
    };

    EShop.toObject = function (e) {
        return {
            id: e.id,
            name: e.name,
            serviceConnections: e.serviceConnectionList.toArray(ServiceConnection.toObject)
        };
    };

    EShop.fromObject = function (o) {
        return new EShop(parseInt(o.id), o.name, new List(o.serviceConnections, ServiceConnection.fromObject));
    };

    EShop.prototype.addServiceConnection = function (serviceType, info) {
        this.serviceConnectionList.push(new ServiceConnection(serviceType, moment().toDate(), info));
    };

    EShop.prototype.getServiceConnection = function (serviceType) {
        return this.serviceConnectionList.findOneOnly(function (serviceConnection) {
            return serviceConnection.ServiceType == serviceType;
        });
    };
    return EShop;
})();
module.exports = EShop;
