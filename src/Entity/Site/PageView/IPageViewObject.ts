
export = IPageViewObject;
interface IPageViewObject {
	id: number;
	feedLoadId: number;
	eShopId: number;
	pagePath?: string;
	pageViews?: number;
	entrances?: number;
}
