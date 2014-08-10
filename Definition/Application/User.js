var User = {
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
        }]
};
module.exports = User;
