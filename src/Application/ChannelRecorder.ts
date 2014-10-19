
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import AbstractRecorder = require('../AbstractRecorder');
import Channel = require('../Entity/Application/Channel');
import List = require('../Entity/List');
import ChannelModel = require('../Definition/Application/ChannelModel');

export = ChannelRecorder;
class ChannelRecorder extends AbstractRecorder {
	
	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.model = ChannelModel;
	}

	insertOrUpdateList(channelList: List<Channel>, callback: (e: Error, channelList?: List<Channel>) => void) {
		channelList.createEach().on('item', (channel: Channel, next) => {
			this.insertOrUpdate(channel, next);
		})
		.on('error', (e: Error) => {
			callback(e);
		})
		.on('end', () => {
			callback(null, channelList);
		});
	}

	insertOrUpdate(channel: Channel, callback: (e: Error, channel?: Channel) => void) {
		this.model.findOne({ id: channel.Id, eShopId: channel.EShopId }, (e, doc: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!doc) {
				doc = new this.model({});
				this.getNextId(this.model, (id) => {
					channel.Id = id;
					this.update(doc, Channel.fromObject, channel, callback);
				});
				return;
			}
			this.update(doc, Channel.fromObject, channel, callback);
		});
	}
}
