
import ActionPlaceholderEnum = require('./ActionPlaceholderEnum');

export = ActionPlaceholderFactory;
class ActionPlaceholderFactory {

	static createActionPlaceholderEnum(placeholder: string) {
		switch (placeholder) {
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_NAME]:
				return ActionPlaceholderEnum.PRODUCT_NAME;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.DISCOUNT_VALUE]:
				return ActionPlaceholderEnum.DISCOUNT_VALUE;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.COMMERCIAL_CHANELS]:
				return ActionPlaceholderEnum.COMMERCIAL_CHANELS;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_PRICE]:
				return ActionPlaceholderEnum.PRODUCT_PRICE;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRICE_CHANGE]:
				return ActionPlaceholderEnum.PRICE_CHANGE;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_PACKAGE_OPTION]:
				return ActionPlaceholderEnum.PRODUCT_PACKAGE_OPTION;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_SKU]:
				return ActionPlaceholderEnum.PRODUCT_SKU;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_STOCKING_TIME]:
				return ActionPlaceholderEnum.PRODUCT_STOCKING_TIME;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.CUSTOMERS_FOR_PRODUCT]:
				return ActionPlaceholderEnum.CUSTOMERS_FOR_PRODUCT;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_MARGIN_RATE]:
				return ActionPlaceholderEnum.PRODUCT_MARGIN_RATE;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.PRODUCT_CONVERSION_RATE]:
				return ActionPlaceholderEnum.PRODUCT_CONVERSION_RATE;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.CATEGORY_NAME]:
				return ActionPlaceholderEnum.CATEGORY_NAME;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.CATEGORY_CHANGE_IN_SALE]:
				return ActionPlaceholderEnum.CATEGORY_CHANGE_IN_SALE;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.BENEFITS]:
				return ActionPlaceholderEnum.BENEFITS;
			case ActionPlaceholderEnum[ActionPlaceholderEnum.CATEGORY_NAME_BY_PRODUCT]:
				return ActionPlaceholderEnum.CATEGORY_NAME_BY_PRODUCT;
		}
		return null;
	}
}
