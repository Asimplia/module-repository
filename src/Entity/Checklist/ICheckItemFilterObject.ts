
import IValueTypeGroupObject = require('./ValueType/IValueTypeGroupObject');

export = ICheckItemFilterObject;
interface ICheckItemFilterObject {
	eShopId?: number;
	updatedAt?: Date;
	categoryId?: number;
	valueTypeGroups?: IValueTypeGroupObject[];
}
