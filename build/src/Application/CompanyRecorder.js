var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var Company = require('../Entity/Application/Company');

var CompanyModel = require('../Definition/Application/CompanyModel');

var CompanyRecorder = (function (_super) {
    __extends(CompanyRecorder, _super);
    function CompanyRecorder() {
        _super.call(this);
        this.model = CompanyModel;
    }
    CompanyRecorder.prototype.insertOrUpdateList = function (companyList, callback) {
        var _this = this;
        companyList.createEach().on('item', function (company, next) {
            _this.insertOrUpdate(company, next);
        }).on('error', function (e) {
            callback(e);
        }).on('end', function () {
            callback(null, companyList);
        });
    };

    CompanyRecorder.prototype.insertOrUpdate = function (company, callback) {
        var _this = this;
        this.model.findOne({ id: company.Id }, function (e, doc) {
            if (e) {
                callback(e);
                return;
            }
            if (!doc) {
                doc = new _this.model({});
                _this.getNextId(_this.model, function (id) {
                    company.Id = id;
                    _this.update(doc, Company.fromObject, company, callback);
                });
                return;
            }
            _this.update(doc, Company.fromObject, company, callback);
        });
    };
    return CompanyRecorder;
})(AbstractRecorder);
module.exports = CompanyRecorder;
