
export = IValueFailureObject;
interface IValueFailureObject {
	id: number;
	feedLoadId: number;
	columnId: number;
	eShopId: number;
	formerValue: string;
	lengthFailedAt: Date;
	dataTypeFailedAt: Date;
}
