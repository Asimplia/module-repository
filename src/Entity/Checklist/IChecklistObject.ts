
import ILocalizedStringObject = require('../Locale/ILocalizedStringObject');

export = IChecklistObject;
interface IChecklistObject {
	id?: string;
	eShopId: number;
	dateCreated: Date;
	section: string;
	name: ILocalizedStringObject;
	dateResolved: Date;
	totalCount?: number;
	doneIndex?: number;
}
