var ServiceTypeEnum = require('./ServiceTypeEnum');

var ServiceTypeFactory = (function () {
    function ServiceTypeFactory() {
    }
    ServiceTypeFactory.createServiceTypeEnum = function (serviceType) {
        switch (serviceType) {
            case ServiceTypeEnum[0 /* GOOGLE_ANALYTICS */]:
                return 0 /* GOOGLE_ANALYTICS */;
            case ServiceTypeEnum[1 /* MAILCHIMP */]:
                return 1 /* MAILCHIMP */;
        }
        return null;
    };
    return ServiceTypeFactory;
})();
module.exports = ServiceTypeFactory;
