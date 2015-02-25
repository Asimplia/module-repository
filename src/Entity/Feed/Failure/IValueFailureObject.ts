
export = IValueFailureObject;
interface IValueFailureObject {
	id: number;
	feedLoadId: number;
	columnId: number;
	eShopId: number;
	formerValue: string;
	lengthFailedAt?: Date;
	dataTypeFailedAt?: Date;
	heurekaProductId?: number;
	heurekaParamId?: number;
	heurekaDeliveryId?: number;
	heurekaAccessoryId?: number;
	zboziProductId?: number;
}
