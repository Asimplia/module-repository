
import IIdentificable = require('./IIdentificable');

export = IHashIdentificable;
interface IHashIdentificable extends IIdentificable {
	Id: string;
}
