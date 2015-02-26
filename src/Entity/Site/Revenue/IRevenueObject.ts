
export = IRevenueObject;
interface IRevenueObject {
	id: number;
	feedLoadId: number;
	eShopId: number;
	productName?: string;
	productSku?: string;
	itemQuantity?: number;
	itemRevenue?: number;
}
