
import ICheckItemObject = require('./ICheckItemObject');
import ILocalizedStringObject = require('../Locale/ILocalizedStringObject');
import IImageObject = require('../Image/IImageObject');

export = IChecklistObject;
interface IChecklistObject {
	id?: string;
	eShopId: number;
	dateCreated: Date;
	section: string;
	name: ILocalizedStringObject;
	checkItems: ICheckItemObject[];
	mainImage: IImageObject;
	dateResolved: Date;
}
