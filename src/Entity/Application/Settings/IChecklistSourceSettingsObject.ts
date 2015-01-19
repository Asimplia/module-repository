
import IChecklistSourcesObject = require('./IChecklistSourcesObject');

export = IChecklistSourceSettingsObject;
interface IChecklistSourceSettingsObject {
	id: string;
	eShopId: number;
	sources: IChecklistSourcesObject;
	closedAt: Date;
}
