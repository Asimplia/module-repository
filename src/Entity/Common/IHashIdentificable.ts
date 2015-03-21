
import IIdentificable = require('./IIdentificable');

export = IHashIdentificable;
interface IHashIdentificable extends IIdentificable {
	/* tslint:disable:variable-name */
	Id: string;
	/* tslint:enable */
}
