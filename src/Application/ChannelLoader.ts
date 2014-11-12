
import mongoose = require('mongoose');
import Channel = require('../Entity/Application/Channel');
import List = require('../Entity/List');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import ChannelModel = require('../Definition/Application/ChannelModel');

export = ChannelLoader;
class ChannelLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = ChannelModel;
	}

	getById(eShopId: number, id: number, callback: (e: Error, channel?: Channel) => void) {
		this.model.findOne({ "id": id, "eShopId": eShopId }, (e, object: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, Channel.fromObject(object));
		});
	}

	getCount(eShopId: number, callback: (e: Error, count?: number) => void): void {
		this.model.count({ "eShopId": eShopId }, (e, count: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(e, count);
		});
	}

	searchList(eShopId: number, query: string, filter: { limit?: number; offset?: number }, callback: (e: Error, channelList?: List<Channel>) => void) {
		this.model.find({ "eShopId": eShopId, "name": { $regex: query, $options: 'i' } })
		.limit(filter.limit)
		.skip(filter.offset)
		.exec((e: Error, objects: any[]) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, new List<Channel>(objects, Channel.fromObject));
		});
	}

	getMaxDateCreated(callback: (e: Error, maxDateCreated?: Date) => void) {
		this.model.findOne({}).sort({ 'dateCreated': -1 }).exec((e, object: any) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, object.dateCreated);
		});
	}
}
