
import mongoose = require('mongoose');
import User = require('../Entity/Application/User');
import List = require('../Entity/List');
import UserModel = require('../Definition/Application/UserModel');
import DocumentExecutor = require('../Util/DocumentExecutor');
import AuthHash = require('../Entity/Application/AuthHash');
import UserCallback = require('./UserCallback');
import UserListCallback = require('./UserListCallback');

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

	insertOrUpdateList(userList: List<User>, callback: UserListCallback) {
		this.documentExecutor.insertOrUpdateList(userList, callback);
	}

	insertOrUpdate(user: User, callback: UserCallback) {
		this.documentExecutor.insertOrUpdate(user, callback);
	}

	deactivateAuthHash(user: User, authHash: string, callback: UserCallback) {
		var foundAuthHash = user.AuthHashList.find((findAuthHash: AuthHash) => {
			return findAuthHash.AuthHash == authHash;
		});
		foundAuthHash.Active = false;
		this.documentExecutor.update(user, callback);
	}

	activateAuthHashBySessionId(user: User, sessionId: string, callback: UserCallback) {
		var foundAuthHash = user.AuthHashList.find((findAuthHash: AuthHash) => {
			return findAuthHash.SessionId == sessionId;
		});
		foundAuthHash.Active = true;
		this.documentExecutor.update(user, callback);
	}

	addAuthHash(user: User, authHash: AuthHash, callback: UserCallback) {
		user.AuthHashList.push(authHash);
		this.documentExecutor.update(user, callback);
	}
}
