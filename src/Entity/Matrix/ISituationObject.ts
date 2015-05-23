
export = ISituationObject;
interface ISituationObject {
	id: number;
	eShopId: number;
	productId: number;
	customerId: number;
	channelId: number;
	orderId: number;
	categoryId: number;
	loadLogId: number;
	dateCreated: Date;
	dateSuggestionResultCreated: Date;
	dateSuggestionResultProcessed: Date;
	dateChecklistCreated: Date;
	dateChecklistProcessed: Date;
}
