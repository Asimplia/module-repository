
import IEntity = require('../IEntity');
import IChecklistObject = require('../../Definition/Checklist/IChecklistObject');

export = Checklist;
class Checklist implements IEntity {

	constructor(
		private id: number
	) {}

	get Id() { return this.id; }

	static fromObject(object: IChecklistObject) {
		return new Checklist(
			parseInt(object.id)
		);
	}

	static toObject(entity: Checklist) {
		return {
			id: entity.id
		};
	}

	toObject() {
		return Checklist.toObject(this);
	}
}
