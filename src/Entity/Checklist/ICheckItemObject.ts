
import ILocalizedStringObject = require('../Locale/ILocalizedStringObject');
import IValueObject = require('./IValueObject');

export = ICheckItemObject;
interface ICheckItemObject {
	label: ILocalizedStringObject;
	values: IValueObject[];
}
