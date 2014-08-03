
/// <reference path="../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import User = require('../Entity/Application/User');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import UserModel = require('./UserModel');

export = UserLoader;
class UserLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = UserModel;
	}

	getByCredentials(identity: string, authType: AuthTypeEnum, callback: (e: Error, user?: User) => void) {
		this.model.findOne({ "authenticates.identity": identity, "authenticates.authType": AuthTypeEnum[authType] }, (e, userObject: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!userObject) {
				callback(null, null);
				return;
			}
			callback(null, User.fromObject(userObject));
		});
	}

	getBySessionId(sessionId: string, callback: (e: Error, user?: User) => void) {
		this.model.findOne({ "authHashes.sessionId": sessionId }, (e, userObject: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!userObject) {
				callback(null, null);
				return;
			}
			callback(null, User.fromObject(userObject));
		});
	}
}
