
import ILocalizedStringObject = require('../Locale/ILocalizedStringObject');
import IValueObject = require('./IValueObject');
import ICheckItemId = require('./ICheckItemId');

export = ICheckItemObject;
interface ICheckItemObject {
	label: ILocalizedStringObject;
	values: IValueObject[];
	checkItemId: ICheckItemId;
}
