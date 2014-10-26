
import Repository = require('../index');

export = PlaceholderCategoryLoader;
class PlaceholderCategoryLoader {

	private db;

	constructor() {
		Repository.getGraphDatabase((db: any) => {
			this.db = db;
		});
	}

	getName(categoryId: number, callback: (e: Error, categoryName?: string) => void): void {
		this.db.query('MATCH (a:CATEGORY) WHERE (a.categoryId = {categoryId} ) RETURN a.name', {
			categoryId: categoryId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.name']);
		});
	}

	getChangeInSale(categoryId: number, callback: (e: Error, changeInSale?: number) => void): void {
		this.db.query('MATCH (a:CATEGORY) WHERE (a.categoryId = {categoryId}) RETURN a.categoryChangeInSale', {
			categoryId: categoryId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.categoryChangeInSale']);
		});
	}
}
