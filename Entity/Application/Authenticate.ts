
import IEntity = require('../IEntity');
import AuthTypeEnum = require('./AuthTypeEnum');

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

	static toObject(e: Authenticate) {
		return {
			identity: e.identity,
			verification: e.verification,
			authType: AuthTypeEnum[e.authType],
			salt: e.salt
		};
	}

	static fromObject(o: any) {
		return new Authenticate(o.identity, o.verification, Authenticate.createAuthTypeEnum(o.authType), o.salt);
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
