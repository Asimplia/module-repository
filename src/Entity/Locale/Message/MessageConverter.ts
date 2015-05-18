
import Util = require('asimplia-util');
import Converter = Util.ODBM.Entity.Converter;
import Message = require('./Message');
import IMessageObject = require('./IMessageObject');
/* tslint:disable */
Util;
/* tslint:enable */

export = MessageConverter;
class MessageConverter extends Converter<Message, IMessageObject> {

	static $service = 'Entity.Locale.Message.MessageConverter';
	constructor() {
		super(Message);
	}
}
