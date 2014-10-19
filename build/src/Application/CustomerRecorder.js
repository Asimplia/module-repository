var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var Customer = require('../Entity/Application/Customer');

var CustomerModel = require('../Definition/Application/CustomerModel');

var CustomerRecorder = (function (_super) {
    __extends(CustomerRecorder, _super);
    function CustomerRecorder() {
        _super.call(this);
        this.model = CustomerModel;
    }
    CustomerRecorder.prototype.insertOrUpdateList = function (customerList, callback) {
        var _this = this;
        customerList.createEach().on('item', function (customer, next) {
            _this.insertOrUpdate(customer, next);
        }).on('error', function (e) {
            callback(e);
        }).on('end', function () {
            callback(null, customerList);
        });
    };

    CustomerRecorder.prototype.insertOrUpdate = function (customer, callback) {
        var _this = this;
        this.model.findOne({ id: customer.Id }, function (e, doc) {
            if (e) {
                callback(e);
                return;
            }
            if (!doc) {
                doc = new _this.model({});
                _this.getNextId(_this.model, function (id) {
                    customer.Id = id;
                    _this.update(doc, Customer.fromObject, customer, callback);
                });
                return;
            }
            _this.update(doc, Customer.fromObject, customer, callback);
        });
    };
    return CustomerRecorder;
})(AbstractRecorder);
module.exports = CustomerRecorder;
