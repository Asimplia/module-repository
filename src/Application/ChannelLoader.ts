
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import Channel = require('../Entity/Application/Channel');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import ChannelModel = require('../Definition/Application/ChannelModel');

export = ChannelLoader;
class ChannelLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = ChannelModel;
	}

	getById(id: number, callback: (e: Error, channel?: Channel) => void) {
		this.model.findOne({ "id": id }, (e, object: mongoose.Document) => {
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

	getCount(callback: (e: Error, count?: number) => void): void {
		this.model.count({}, (e, count: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(e, count);
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
