
export = IZboziProductObject;
interface IZboziProductObject {
	id: number;
	feedLoadId: number;
	eShopId: number;
	product: string;
	productName: string;
	description: string;
	url: string;
	imageUrl: string;
	price: number;
	vat: number;
	priceVat: number;
	maxCpc: number;
	maxCpcSearch: number;
	dues: number;
	deliveryDate: string;
	shopDepots: string;
	unfeatured: boolean;
	itemType: string;
	extraMessage: string;
	manufacturer: string;
	categoryText: string;
	ean: string;
	productNumber: string;
	variantName: string;
}
