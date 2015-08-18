
import ActionPlaceholderEnum = require('./ActionPlaceholderEnum');

export = ActionPlaceholderFactory;
class ActionPlaceholderFactory {

	static createActionPlaceholderEnum(placeholder: string): ActionPlaceholderEnum {
		if (typeof ActionPlaceholderEnum[placeholder] !== 'undefined') {
			return ActionPlaceholderEnum[placeholder];
		}
		return null;
	}
}
