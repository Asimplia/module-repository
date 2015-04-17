
import IValueTypeObject = require('./IValueTypeObject');
import ILocalizedStringObject = require('../../Locale/ILocalizedStringObject');

export = IValueTypeGroupObject;
interface IValueTypeGroupObject {
	type: string;
	name: ILocalizedStringObject;
	valueTypes: IValueTypeObject[];
}
