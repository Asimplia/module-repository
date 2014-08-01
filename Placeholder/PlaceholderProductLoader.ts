
import Repository = require('../index');


export = PlaceholderProductLoader;
class PlaceholderProductLoader {

	private db;

	constructor() {
		Repository.getGraphDatabase((db: any) => {
			this.db = db;
		});
	}

	getName(productId: number, callback: (e: Error, productName?: string) => void): void {
		this.db.query('MATCH (c:Customer {name: "Karel Havlena"}) RETURN c.name;', {
			productId: productId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['c.name']);
		});
	}

	getPrice(productId: number, callback: (e: Error, price?: number) => void): void {
		this.db.query('MATCH (a:Product) WHERE (a.id = "{productId}") RETURN a', {
			productId: productId
		}, (e: Error, price: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, price);
		});
	}

	getPackageOption(productId: number, callback: (e: Error, productNames?: string[]) => void): void {
		this.db.query('MATCH (a:Product) WHERE (a.id = "{productId}") RETURN a', {
			productId: productId
		}, (e: Error, productNames: string[]) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, productNames);
		});
	}

	getStokingTime(productId: number, callback: (e: Error, stokingTime?: number) => void): void {
		this.db.query('MATCH (a:Product) WHERE (a.id = "{productId}") RETURN a', {
			productId: productId
		}, (e: Error, stokingTime: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, stokingTime);
		});
	}

}
