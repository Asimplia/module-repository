
import IEntity = require('../IEntity');
import moment = require('moment');

export = AuthHash;
class AuthHash implements IEntity {

	get DateAuthenticated() { return this.dateAuthenticated; }
	get AuthHash() { return this.authHash; }

	constructor(
		private dateAuthenticated: Date,
		private authHash: string
	) {}

	toObject() {
		return AuthHash.toObject(this);
	}

	static toObject(e: AuthHash) {
		return {
			dateAuthenticated: e.dateAuthenticated,
			authHash: e.authHash
		};
	}

	static fromObject(o: any) {
		return new AuthHash(moment(o.dateAuthenticated).toDate(), o.authHash);
	}
}
