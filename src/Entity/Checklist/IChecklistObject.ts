
import ICheckItemObject = require('./ICheckItemObject');
import ILocalizedStringObject = require('../Locale/ILocalizedStringObject');

export = IChecklistObject;
interface IChecklistObject {
	id?: string;
	eShopId: number;
	dateCreated: Date;
	section: string;
	name: ILocalizedStringObject;
	checkItems: ICheckItemObject[];
	dateResolved: Date;
}
