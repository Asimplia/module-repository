
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Message = require('./Message');
/* tslint:disable */
Util;
/* tslint:enable */

export = MessageList;
class MessageList extends List<Message> {

	getLastChangedAt() {
		return this.max((message: Message) => {
			return message.LastChangedAt.valueOf();
		});
	}
}
