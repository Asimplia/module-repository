
import ILocalizedStringObject = require('../../Locale/ILocalizedStringObject');

export = IValueTypeObject;
interface IValueTypeObject {
	type: string;
	name: ILocalizedStringObject;
	message: ILocalizedStringObject;
}
