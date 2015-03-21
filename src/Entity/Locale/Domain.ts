
import DomainEnum = require('./DomainEnum');
import Locale = require('./Locale');

export = Domain;
class Domain {

	get Domain() { return this.domain; }
	get Locale() { return this.locale; }

	constructor(
		private domain: DomainEnum,
		private locale: Locale
	) { }

}
