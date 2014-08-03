
/// <reference path="../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import AbstractRecorder = require('../AbstractRecorder');
import User = require('../Entity/Application/User');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');

export = UserRecorder;
class UserRecorder extends AbstractRecorder {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.model = require('./UserModel');
	}

	insertOrUpdate(user: User, callback: (e: Error, user?: User) => void) {
		this.model.findOne({ id: user.Id }, (e, userDocument: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!userDocument) {
				userDocument = new this.model({});
				this.getNextId(this.model, (id) => {
					user.Id = id;
					this.update(userDocument, User.fromObject, user, callback);
				});
				return;
			}
			this.update(userDocument, User.fromObject, user, callback);
		});
	}
}
