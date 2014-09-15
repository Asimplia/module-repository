
import IEntity = require('../IEntity');
import moment = require('moment');

export = AuthHash;
class AuthHash implements IEntity {

	get DateAuthenticated() { return this.dateAuthenticated; }
	get AuthHash() { return this.authHash; }
	get SessionId() { return this.sessionId; }
	get Active() { return this.active; }
	set Active(value) { this.active = value; }

	constructor(
		private dateAuthenticated: Date,
		private authHash: string,
		private sessionId: string,
		private active: boolean
	) {}

	toObject() {
		return AuthHash.toObject(this);
	}

	static toObject(e: AuthHash) {
		return {
			dateAuthenticated: e.dateAuthenticated,
			authHash: e.authHash,
			sessionId: e.sessionId,
			active: e.active
		};
	}

	static fromObject(o: any) {
		return new AuthHash(moment(o.dateAuthenticated).toDate(), o.authHash, o.sessionId, !!o.active);
	}
}
