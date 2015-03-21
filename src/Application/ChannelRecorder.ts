
import mongoose = require('mongoose');
import Channel = require('../Entity/Application/Channel');
import List = require('../Entity/List');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = ChannelRecorder;
class ChannelRecorder {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Application.ChannelModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, Channel);
	}

	insertOrUpdateList(channelList: List<Channel>, callback: (e: Error, channelList?: List<Channel>) => void) {
		this.documentExecutor.insertOrUpdateList(channelList, callback);
	}

	insertOrUpdate(channel: Channel, callback: (e: Error, channel?: Channel) => void) {
		this.documentExecutor.insertOrUpdate(channel, callback);
	}
}
