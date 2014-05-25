

export = Record;
class Record {

	get Type(): string { return this.type; }
	set Type(value: string) { this.type = value; }
	get Description(): string { return this.description; }
	set Description(value: string) { this.description = value; }

	constructor(private type: string, private description: string) { }
}
