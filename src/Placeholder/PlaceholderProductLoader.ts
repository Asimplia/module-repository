
import _ = require('underscore');

export = PlaceholderProductLoader;
class PlaceholderProductLoader {

	private db: any;

	static $inject = [
		'connection.postgres',
	];
	constructor(
		private connection: any
	) {}

	getTotalProductCost(productIds: number[], callback: (e: Error, totalCost?: number) => void) {
		var placeholders = _.map(_.range(1, productIds.length + 1), (i: number) => '$' + i);
		var sql = 'SELECT sum(COALESCE(heureka.price_vat * ga_revenue.itemquantity, heureka.price_vat, 0)) AS total_cost \
				FROM feed.masterproduct \
				LEFT JOIN feed.heureka ON heureka.heurekaid = masterproduct.heurekaid \
				LEFT JOIN feed.ga_revenue ON ga_revenue.revenuesid = masterproduct.revenuesid \
				WHERE masterproduct.productid IN (' + placeholders.join(', ') + ')';
		this.connection.query(sql, productIds, (e: Error, result: any) => {
			if (e) return callback(e);
			callback(null, result.rows.length ? result.rows[0].total_cost : 0);
		});
	}

	getName(productId: number, callback: (e: Error, productName?: string) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.name', {
			productId: productId
		}, (e: Error, res: any) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.name']);
		});
	}

	getPrice(productId: number, callback: (e: Error, price?: number) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productPrice', {
			productId: productId
		}, (e: Error, res: any) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.productPrice']);
		});
	}

	getPriceChange(productId: number, callback: (e: Error, priceChange?: number) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productPriceChange', {
			productId: productId
		}, (e: Error, res: any) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.productPriceChange']);
		});
	}

	getPackageOption(productId: number, callback: (e: Error, productNames?: string[]) => void): void {
		this.db.query('MATCH (a:PRODUCT)-->(b:ORDER_ITEM)-->(c:ORDER)<--(d:ORDER_ITEM)--(e:PRODUCT) \
			WHERE (a.productId = {productId}) RETURN e.name', {
			productId: productId
		}, (e: Error, res: any) => {
			if (e) {
				callback(e);
				return;
			}
			var productNames = _.map(res, (row: any) => {
				return row['e.name'];
			});
			callback(null, productNames);
		});
	}

	getSku(productId: number, callback: (e: Error, productSku?: number) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productSku', {
			productId: productId
		}, (e: Error, res: any) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.productSku']);
		});
	}

	getMarginRate(productId: number, callback: (e: Error, marginRate?: number) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productMarginRate', {
			productId: productId
		}, (e: Error, res: any) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.productMarginRate']);
		});
	}

	getCustomersForProduct(
		productId: number,
		callback: (e: Error, customers?: { firstname: string; lastname: string; email: string }[]) => void)
	: void {
		this.db.query('MATCH (a:PRODUCT {productId: {productId} })-[*2]->(c:ORDER)<-[*2]-(e:PRODUCT) \
			WITH e MATCH (x:CUSTOMER)<--(c:ORDER)<-[*2]-(e) WHERE NOT (e.productId = {productId} ) \
			RETURN DISTINCT x.firstname, x.lastname, x.email LIMIT 50', {
			productId: productId
		}, (e: Error, res: any) => {
			if (e) {
				callback(e);
				return;
			}
			var customers = _.map(res, (row: any) => {
				return { firstname: row['x.firstname'], lastname: row['x.lastname'], email: row['x.email'] };
			});
			callback(null, customers);
		});
	}

	getConversionRate(productId: number, callback: (e: Error, conversionRate?: number) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.conversionRate', {
			productId: productId
		}, (e: Error, res: any) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.conversionRate']);
		});
	}

	getDiscountValue(productId: number, callback: (e: Error, discount?: number) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.discount', {
			productId: productId
		}, (e: Error, res: any) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.discount']);
		});
	}

	getStockingTime(productId: number, callback: (e: Error, stockingTime?: number) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productStockingTime', {
			productId: productId
		}, (e: Error, res: any) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.productStockingTime']);
		});
	}

	getCategoryName(productId: number, callback: (e: Error, categoryName?: string) => void): void {
		this.db.query('MATCH (a:PRODUCT)-->(b:CATEGORY) WHERE (a.productId = {productId}) RETURN b.name limit 1', {
			productId: productId
		}, (e: Error, res: any) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['b.name']);
		});
	}

	getCommercialChannels(productId: number, callback: (e: Error, channelNames?: string[]) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.name', {
			productId: productId
		}, (e: Error, res: any) => {
			if (e) {
				callback(e);
				return;
			}
			var channelNames = _.map(res, (row: any) => {
				return row['a.name'];
			});
			callback(null, channelNames);
		});
	}

}
