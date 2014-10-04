
import IEntity = require('../IEntity');
import AuthTypeEnum = require('./AuthTypeEnum');
import EntityPreparer = require('../EntityPreparer');

export = Authenticate;
class Authenticate implements IEntity {

	get Identity() { return this.identity; }
	get Verification() { return this.verification; }
	get AuthType() { return this.authType; }
	get Salt() { return this.salt; }

	constructor(
		private identity: string,
		private verification: string,
		private authType: AuthTypeEnum,
		private salt: string
	) {}

	toObject() {
		return Authenticate.toObject(this);
	}

	hasValidVerification() {
		return this.verification.length >= 8;
	}

	hasValidIdentity() {
		return this.identity.length >= 5;
	}

	static toObject(e: Authenticate) {
		return {
			identity: e.identity,
			verification: e.verification,
			authType: AuthTypeEnum[e.authType],
			salt: e.salt
		};
	}

	static fromObject(o: any) {
		return new Authenticate(
			EntityPreparer.string(o.identity), 
			EntityPreparer.stringOrNull(o.verification), 
			Authenticate.createAuthTypeEnum(o.authType), 
			EntityPreparer.stringOrNull(o.salt)
		);
	}

	static createAuthTypeEnum(authType: string) {
		switch (authType) {
			case AuthTypeEnum[AuthTypeEnum.EMAIL]:
				return AuthTypeEnum.EMAIL;
			case AuthTypeEnum[AuthTypeEnum.USERNAME]:
				return AuthTypeEnum.USERNAME;
			default:
				return null;
		}
	}
}
