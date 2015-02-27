
import mongoose = require('mongoose');
import User = require('../Entity/Application/User');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import UserModel = require('../Definition/Application/UserModel');

export = UserLoader;
class UserLoader {

	static $inject = [
		'Definition.Application.UserModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {}

	getByCredentials(identity: string, authType: AuthTypeEnum, callback: (e: Error, user?: User) => void) {
		this.model.findOne({ "authenticates.identity": identity, "authenticates.authType": AuthTypeEnum[authType] }, (e, userObject: mongoose.Document) => {
			if (e) return callback(e);
			if (!userObject) {
				return callback(null, null);
			}
			callback(null, User.fromObject(userObject));
		});
	}

	getActiveBySessionId(sessionId: string, callback: (e: Error, user?: User) => void) {
		this.model.findOne({ "authHashes.sessionId": sessionId, "authHashes.active": true }, (e, userObject: mongoose.Document) => {
			if (e) return callback(e);
			if (!userObject) {
				return callback(null, null);
			}
			callback(null, User.fromObject(userObject));
		});
	}

	getActiveByAuthHash(authHash: string, callback: (e: Error, user?: User) => void) {
		this.model.findOne({ "authHashes.authHash": authHash, "authHashes.active": true }, (e, userObject: mongoose.Document) => {
			if (e) return callback(e);
			if (!userObject) {
				return callback(null, null);
			}
			callback(null, User.fromObject(userObject));
		});
	}

	getCount(callback: (e: Error, count?: number) => void): void {
		this.model.count({}, (e, count: number) => {
			if (e) return callback(e);
			callback(null, count);
		});
	}
}
