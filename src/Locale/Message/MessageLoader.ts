
import _ = require('underscore');
import mongoose = require('mongoose');
import Message = require('../../Entity/Locale/Message/Message');
import IMessageObject = require('../../Entity/Locale/Message/IMessageObject');
import MessageList = require('../../Entity/Locale/Message/MessageList');
import Util = require('asimplia-util');
import Manager = Util.ODBM.Repository.MongoDB.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = MessageLoader;
class MessageLoader {

	static $service = 'Locale.Message.MessageLoader';
	static $inject = [
		'connection.mongoose',
	];
	constructor(
		private connection: mongoose.Mongoose,
		private manager: Manager<Message, IMessageObject, MessageList>
			= new Manager<Message, IMessageObject, MessageList>(
				Message, MessageList, connection
			)
	) {}

	getBySource(source: string, callback: (e: Error, entity?: Message) => void) {
		var conditions = {
			source: source
		};
		this.manager.Model.findOne(conditions, (e: Error, doc: mongoose.Document) => {
			if (e) return callback(e);
			if (!doc) return callback(null, null);
			callback(null, this.manager.Converter.fromRow(doc.toObject()));
		});
	}

	getListLastChangedFrom(lastChangedFrom: Date, callback: (e: Error, messageList?: MessageList) => void) {
		var conditions: any = {};
		if (lastChangedFrom) {
			conditions.lastChangedAt = { $gt: lastChangedFrom };
		}
		var query = this.manager.Model.find(conditions);
		query.exec((e: Error, docs: mongoose.Document[]) => {
			if (e) return callback(e);
			callback(null, this.manager.Converter.getList(
				MessageList,
				Message,
				_.map(docs, (doc: mongoose.Document) => doc.toObject())
			));
		});
	}

}
