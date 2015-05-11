
import ILocalizedStringObject = require('../Locale/ILocalizedStringObject');

export = IValueObject;
interface IValueObject {
	valueType: string;
	dateChecked: Date
	priorityType: string;
	label: ILocalizedStringObject;
}
