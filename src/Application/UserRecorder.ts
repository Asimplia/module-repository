
import mongoose = require('mongoose');
import User = require('../Entity/Application/User');
import List = require('../Entity/List');
import UserModel = require('../Definition/Application/UserModel');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = UserRecorder;
class UserRecorder {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Application.UserModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, User);
	}

	insertOrUpdateList(userList: List<User>, callback: (e: Error, userList?: List<User>) => void) {
		this.documentExecutor.insertOrUpdateList(userList, callback);
	}

	insertOrUpdate(user: User, callback: (e: Error, user?: User) => void) {
		this.documentExecutor.insertOrUpdate(user, callback);
	}
}
