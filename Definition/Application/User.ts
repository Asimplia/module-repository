
export = User;
var User = {
	id: Number,
	firstName: String,
	lastName: String,
	authenticates: [{
		identity: String,
		verification: String,
		authType: String,
		salt: String
	}],
	authHashes: [{
		dateAuthenticated: Date,
		authHash: String
	}]
};
