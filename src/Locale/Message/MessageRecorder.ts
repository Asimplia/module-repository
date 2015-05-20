
import mongoose = require('mongoose');
import Message = require('../../Entity/Locale/Message/Message');
import IMessageObject = require('../../Entity/Locale/Message/IMessageObject');
import MessageList = require('../../Entity/Locale/Message/MessageList');
import LanguageEnum = require('../../Entity/Locale/LanguageEnum');
import Util = require('asimplia-util');
import DateFactory = Util.DateTime.DateFactory;
import Manager = Util.ODBM.Repository.MongoDB.Manager;
/* tslint:disable */
Util;
/* tslint:enable */

export = MessageRecorder;
class MessageRecorder {

	static $service = 'Locale.Message.MessageRecorder';
	static $inject = [
		'connection.mongoose',
		DateFactory,
	];
	constructor(
		private connection: mongoose.Mongoose,
		private dateFactory: DateFactory,
		private manager: Manager<Message, IMessageObject, MessageList>
			= new Manager<Message, IMessageObject, MessageList>(
				Message, MessageList, connection
			)
	) {}

	update(message: Message, callback: (e: Error, message?: Message) => void) {
		message.LastChangedAt = this.dateFactory.now();
		this.manager.update(message, callback);
	}

	private insert(message: Message, callback: (e: Error, message?: Message) => void) {
		message.LastChangedAt = this.dateFactory.now();
		this.manager.insert(message, callback);
	}

	incrementMissing(message: Message, languageEnum: LanguageEnum, callback: (e: Error, message?: Message) => void) {
		message.MissingCount[LanguageEnum[languageEnum]]++;
		this.update(message, callback);
	}

	createMessage(source: string, callback: (e: Error, message?: Message) => void) {
		var message = this.manager.Converter.fromObject({
			source: source,
			lastChangedAt: this.dateFactory.now(),
			text: {
				cs: null,
				en: source
			},
			missingCount: {
				cs: 0,
				en: 0
			}
		});
		this.insert(message, callback);
	}
}
