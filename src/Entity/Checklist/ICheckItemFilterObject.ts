
import IValueTypeGroupObject = require('./ValueType/IValueTypeGroupObject');

export = ICheckItemFilterObject;
interface ICheckItemFilterObject {
	eShopId?: number;
	updatedAt?: Date;
	categoryId?: number;
	checklistId?: string;
	valueTypeGroups?: IValueTypeGroupObject[];
	limit?: number;
	offset?: number;
}
