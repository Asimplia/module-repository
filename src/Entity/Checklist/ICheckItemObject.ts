
import ILocalizedStringObject = require('../Locale/ILocalizedStringObject');
import IValueObject = require('./IValueObject');
import ISituationPrimary = require('./ISituationPrimary');

export = ICheckItemObject;
interface ICheckItemObject {
	id: string;
	label: ILocalizedStringObject;
	values: IValueObject[];
	checklistId: string;
	situationPrimary: ISituationPrimary;
}
