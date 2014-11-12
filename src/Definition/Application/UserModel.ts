
import mongoose = require('mongoose');
import Schema = mongoose.Schema;

export = UserModel;
var Definition = {
	id: Number,
	firstName: String,
	lastName: String,
	eShopId: Number,
	companyId: Number,
	authenticates: [{
		identity: String,
		verification: String,
		authType: String,
		salt: String
	}],
	authHashes: [{
		dateAuthenticated: Date,
		authHash: String,
		sessionId: String,
		active: Boolean
	}],
	email: String,
	phoneNumber: String,
	activeLanguage: String
};
var schema = new Schema(Definition);
var UserModel = mongoose.model('User', schema);
