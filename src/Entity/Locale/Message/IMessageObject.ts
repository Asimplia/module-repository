
import ILocalizedStringObject = require('../ILocalizedStringObject');

export = IMessageObject;
interface IMessageObject {
	source: string;
	lastChangedAt: Date;
	text: ILocalizedStringObject;
	missingCount?: {
		cs: number;
		en: number;
	}
}
