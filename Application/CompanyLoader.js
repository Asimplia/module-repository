var Company = require('../Entity/Application/Company');

var CompanyModel = require('./CompanyModel');

var CompanyLoader = (function () {
    function CompanyLoader() {
        this.model = CompanyModel;
    }
    CompanyLoader.prototype.getById = function (id, callback) {
        this.model.findOne({ "id": id }, function (e, object) {
            if (e) {
                callback(e);
                return;
            }
            if (!object) {
                callback(null, null);
                return;
            }
            callback(null, Company.fromObject(object));
        });
    };
    return CompanyLoader;
})();
module.exports = CompanyLoader;
