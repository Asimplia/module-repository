
import IEntity = require('../IEntity');

export = Record;
class Record implements IEntity {

	get Id(): number { return this.id; }
	get Type(): string { return this.type; }
	set Type(value: string) { this.type = value; }
	get Description(): string { return this.description; }
	set Description(value: string) { this.description = value; }

	constructor(private id, private type: string, private description: string) { }

	toObject(): any {
		return {
			type: this.Type,
			description: this.Description
		};
	}

}
