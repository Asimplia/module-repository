
import IEntity = require('../IEntity');
import List = require('../List');
import Authenticate = require('./Authenticate');
import AuthTypeEnum = require('./AuthTypeEnum');
import AuthHash = require('./AuthHash');
import LanguageEnum = require('../Locale/LanguageEnum');
import Language = require('../Locale/Language');
import EntityPreparer = require('../EntityPreparer');

export = User;
class User implements IEntity {

	public static EMAIL_PATTERN = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';

	get Id() { return this.id; }
	get FirstName() { return this.firstName; }
	get LastName() { return this.lastName; }
	get AuthenticateList() { return this.authenticateList; }
	get AuthHashList() { return this.authHashList; }
	get EShopId() { return this.eShopId; }
	get CompanyId() { return this.companyId; }
	get Email() { return this.email; }
	get PhoneNumber() { return this.phoneNumber; }
	set Id(value: number) { this.id = value; }
	set FirstName(value: string) { this.firstName = value; }
	set LastName(value: string) { this.lastName = value; }
	set AuthenticateList(value: List<Authenticate>) { this.authenticateList = value; }
	set AuthHashList(value: List<AuthHash>) { this.authHashList = value; }
	set EShopId(value: number) { this.eShopId = value; }
	set CompanyId(value: number) { this.companyId = value; }
	set Email(value: string) { this.email = value; }
	set PhoneNumber(value: string) { this.phoneNumber = value; }
	set ActiveLanguage(value: LanguageEnum) { this.activeLanguage = value; }
	get ActiveLanguage() { return this.activeLanguage; }

	constructor(
		private id: number,
		private firstName: string,
		private lastName: string,
		private authenticateList: List<Authenticate>,
		private authHashList: List<AuthHash>,
		private eShopId: number,
		private companyId: number,
		private email: string,
		private phoneNumber: string,
		private activeLanguage: LanguageEnum
		) {}

	toObject() {
		return User.toObject(this);
	}

	static toObject(e: User) {
		return {
			id: e.id,
			firstName: e.firstName,
			lastName: e.lastName,
			authenticates: e.authenticateList ? e.authenticateList.toArray(Authenticate.toObject) : [],
			authHashes: e.authHashList ? e.authHashList.toArray(AuthHash.toObject) : [],
			eShopId: e.eShopId,
			companyId: e.companyId,
			email: e.email,
			phoneNumber: e.phoneNumber,
			activeLanguage: e.activeLanguage !== null ? LanguageEnum[e.activeLanguage] : null
		};
	}

	toSafeObject() {
		var object = this.toObject();
		object.authenticates = this.authenticateList.map((authenticate: Authenticate) => {
			return authenticate.toSafeObject();
		}).toArray();
		object.authHashes = null;
		return object;
	}

	static fromObject(o: any) {
		return new User(
			EntityPreparer.intOrNull(o.id),
			EntityPreparer.string(o.firstName),
			EntityPreparer.string(o.lastName),
			new List<Authenticate>(o.authenticates, Authenticate.fromObject),
			new List<AuthHash>(o.authHashes, AuthHash.fromObject),
			EntityPreparer.int(o.eShopId),
			EntityPreparer.int(o.companyId),
			EntityPreparer.string(o.email),
			EntityPreparer.stringOrNull(o.phoneNumber),
			Language.createLanguageEnum(o.activeLanguage)
		);
	}

	getFullName() {
		return this.firstName + ' ' + this.lastName;
	}

	getUsernameAuthenticate() {
		return this.authenticateList.findOneOnly((authenticate: Authenticate) => {
			return authenticate.AuthType == AuthTypeEnum.USERNAME;
		});
	}

	getEmailAuthenticate() {
		return this.authenticateList.findOneOnly((authenticate: Authenticate) => {
			return authenticate.AuthType == AuthTypeEnum.EMAIL;
		});
	}

	hasValidEmail() {
		return (new RegExp(User.EMAIL_PATTERN)).test(this.email);
	}
}
