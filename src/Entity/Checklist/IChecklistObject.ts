
import ILocalizedStringObject = require('../Locale/ILocalizedStringObject');
import IStatistics = require('./IStatistics');

export = IChecklistObject;
interface IChecklistObject {
	id?: string;
	eShopId: number;
	dateCreated: Date;
	section: string;
	name: ILocalizedStringObject;
	dateResolved: Date;
	statistics?: IStatistics;
}
