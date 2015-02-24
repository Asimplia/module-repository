
export = IHeurekaProductObject;
interface IHeurekaProductObject {
	id: number;
	feedLoadId: number;
	eShopId: number;
	externalId: string;
	productName: string;
	product: string;
	description: string;
	url: string;
	imageUrl: string;
	imageUrlAlternative: string;
	videoUrl: string;
	priceVat: number;
	itemType: string;
	manufacturer: string;
	categoryText: string;
	ean: string;
	isbn: string;
	heurekaCpc: number;
	deliveryDate: string;
	itemGroupId: string;
}
