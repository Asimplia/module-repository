
import IEntity = require('../IEntity');
import List = require('../List');
import Authenticate = require('./Authenticate');
import AuthHash = require('./AuthHash');

export = User;
class User implements IEntity {

	get Id() { return this.id; }
	get FirstName() { return this.firstName; }
	get LastName() { return this.lastName; }
	get AuthenticateList() { return this.authenticateList; }
	get AuthHashList() { return this.authHashList; }
	get EShopId() { return this.eShopId; }
	get CompanyId() { return this.companyId; }

	constructor(
		private id: number,
		private firstName: string,
		private lastName: string,
		private authenticateList: List<Authenticate>,
		private authHashList: List<AuthHash>,
		private eShopId: number,
		private companyId: number
	) {}

	toObject() {
		return User.toObject(this);
	}

	static toObject(e: User) {
		return {
			id: e.id,
			firstName: e.firstName,
			lastName: e.lastName,
			authenticates: e.authenticateList.toArray(Authenticate.toObject),
			authHashes: e.authHashList.toArray(AuthHash.toObject),
			eShopId: e.eShopId,
			companyId: e.companyId
		};
	}

	static fromObject(o: any) {
		return new User(
			o.id,
			o.firstName,
			o.lastName,
			new List<Authenticate>(o.authenticates, Authenticate.fromObject),
			new List<AuthHash>(o.authHashes, AuthHash.fromObject),
			o.eShopId,
			o.companyId
		);
	}

	getFullName() {
		return this.firstName + ' ' + this.lastName;
	}
}
