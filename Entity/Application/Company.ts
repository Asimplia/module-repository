
import IEntity = require('../IEntity');
import EntityPreparer = require('../EntityPreparer');

export = Company;
class Company implements IEntity {

	get Id() { return this.id; }
	get Name() { return this.name; }
	get VATNumber() { return this.vatNumber; }

	constructor(
		private id: number,
		private name: string,
		private vatNumber: string
	) {}

	toObject() {
		return Company.toObject(this);
	}

	static toObject(e: Company) {
		return {
			id: e.id,
			name: e.name,
			vatNumber: e.vatNumber
		};
	}

	static fromObject(o: any) {
		return new Company(
			EntityPreparer.int(o.id),
			EntityPreparer.string(o.name),
			EntityPreparer.stringOrNull(o.vatNumber)
		);
	}
}
