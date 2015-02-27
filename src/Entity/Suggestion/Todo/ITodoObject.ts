
import ILocalizedStringObject = require('../../Locale/ILocalizedStringObject');
import IReasonObject = require('../IReasonObject');

export = ITodoObject;
interface ITodoObject {
	id: number;
	eShopId: number;
	title: ILocalizedStringObject;
	shortTitle: ILocalizedStringObject;
	label: ILocalizedStringObject;
	text: ILocalizedStringObject;
	reasons: IReasonObject[];
	createdAt: Date;
}
