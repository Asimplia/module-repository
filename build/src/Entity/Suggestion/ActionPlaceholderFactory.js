var ActionPlaceholderEnum = require('./ActionPlaceholderEnum');

var ActionPlaceholderFactory = (function () {
    function ActionPlaceholderFactory() {
    }
    ActionPlaceholderFactory.createActionPlaceholderEnum = function (placeholder) {
        switch (placeholder) {
            case ActionPlaceholderEnum[0 /* PRODUCT_NAME */]:
                return 0 /* PRODUCT_NAME */;
            case ActionPlaceholderEnum[1 /* DISCOUNT_VALUE */]:
                return 1 /* DISCOUNT_VALUE */;
            case ActionPlaceholderEnum[2 /* COMMERCIAL_CHANELS */]:
                return 2 /* COMMERCIAL_CHANELS */;
            case ActionPlaceholderEnum[3 /* PRODUCT_PRICE */]:
                return 3 /* PRODUCT_PRICE */;
            case ActionPlaceholderEnum[4 /* PRICE_CHANGE */]:
                return 4 /* PRICE_CHANGE */;
            case ActionPlaceholderEnum[5 /* PRODUCT_PACKAGE_OPTION */]:
                return 5 /* PRODUCT_PACKAGE_OPTION */;
            case ActionPlaceholderEnum[6 /* PRODUCT_SKU */]:
                return 6 /* PRODUCT_SKU */;
            case ActionPlaceholderEnum[7 /* PRODUCT_STOCKING_TIME */]:
                return 7 /* PRODUCT_STOCKING_TIME */;
            case ActionPlaceholderEnum[8 /* CUSTOMERS_FOR_PRODUCT */]:
                return 8 /* CUSTOMERS_FOR_PRODUCT */;
            case ActionPlaceholderEnum[9 /* PRODUCT_MARGIN_RATE */]:
                return 9 /* PRODUCT_MARGIN_RATE */;
            case ActionPlaceholderEnum[10 /* PRODUCT_CONVERSION_RATE */]:
                return 10 /* PRODUCT_CONVERSION_RATE */;
            case ActionPlaceholderEnum[11 /* CATEGORY_NAME */]:
                return 11 /* CATEGORY_NAME */;
            case ActionPlaceholderEnum[12 /* CATEGORY_CHANGE_IN_SALE */]:
                return 12 /* CATEGORY_CHANGE_IN_SALE */;
            case ActionPlaceholderEnum[13 /* BENEFITS */]:
                return 13 /* BENEFITS */;
            case ActionPlaceholderEnum[14 /* CATEGORY_NAME_BY_PRODUCT */]:
                return 14 /* CATEGORY_NAME_BY_PRODUCT */;
        }
        return null;
    };
    return ActionPlaceholderFactory;
})();
module.exports = ActionPlaceholderFactory;
