
import TypeEnum = require('./TypeEnum');

export = NotAllowedNull;
class NotAllowedNull implements Error {

	public name: string;
	public message: string;
	
	constructor(type: TypeEnum) {
		this.name = 'NotAllowedNull';
		this.message = 'Try to set value as NULL, only not null '+TypeEnum[type]+' allowed';
	}
}
