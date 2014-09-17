
import Repository = require('../index');

export = PlaceholderCategoryLoader;
class PlaceholderCategoryLoader {

	private db;

	constructor() {
		Repository.getGraphDatabase((db: any) => {
			this.db = db;
		});
	}

	getName(productId: number, callback: (e: Error, categoryName?: string) => void): void {
		this.db.query('MATCH (a:CATEGORY) WHERE (a.productId = {productId}) RETURN a.name', {
			productId: productId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.name']);
		});
	}

	getChangeInSale(productId: number, callback: (e: Error, changeInSale?: number) => void): void {
		this.db.query('MATCH (a:CATEGORY) WHERE (a.productId = {productId}) RETURN a.categoryChangeInSale', {
			productId: productId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.categoryChangeInSale']);
		});
	}
}
