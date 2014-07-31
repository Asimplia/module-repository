
import Repository = require('../index');


export = PlaceholderProductLoader;
class PlaceholderProductLoader {

	private db;

	constructor() {
		Repository.getGraphDatabase((db: any) => {
			this.db = db;
		});
	}

	getProductName(productId: number, callback: (e: Error, productName?: string) => void): void {
		this.db.query('MATCH (a:Product) WHERE (a.id = "{productId}") RETURN a', {
			productId: productId
		}, (e: Error, productName: string) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, productName);
		});
	}

}
