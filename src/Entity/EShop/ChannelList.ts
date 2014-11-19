
import List = require('../List');
import Channel = require('./Channel');

export = ChannelList;
class ChannelList extends List<Channel> {

	getById(id: number) {
		var index = this.indexBy('Id');
		return index[id];
	}
	
}
