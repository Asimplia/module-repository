var User = {
    id: Number,
    firstName: String,
    lastName: String,
    eShopId: Number,
    authenticates: [{
            identity: String,
            verification: String,
            authType: String,
            salt: String
        }],
    authHashes: [{
            dateAuthenticated: Date,
            authHash: String,
            sessionId: String
        }]
};
module.exports = User;
