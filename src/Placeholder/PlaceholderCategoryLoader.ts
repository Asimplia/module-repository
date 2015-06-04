
import _ = require('underscore');

export = PlaceholderCategoryLoader;
class PlaceholderCategoryLoader {

	private db: any;

	static $inject = [
		'connection.postgres',
	];
	constructor(
		private connection: any
	) {}

	getWorstCategory(
		countProductIdPairs: { productId: number; count: number; }[],
		callback: (e: Error, categoryText?: string) => void
	) {
		var values = [];
		var placeholderPairs = _.map(countProductIdPairs, (pair: { productId: number; count: number; }, i: number) => {
			values.push(pair.productId);
			values.push(pair.count);
			return '($' + (i * 2 + 1) + '::integer, $' + (i * 2 + 2) + '::integer)';
		});
		var sql = 'SELECT heureka.categorytext AS category_text, sum(source.count) AS count\
				FROM (VALUES\
				' + placeholderPairs.join(', ') + '\
				) AS source (productid, count)\
				JOIN feed.masterproduct ON masterproduct.productid = source.productid\
				JOIN feed.heureka ON heureka.heurekaid = masterproduct.heurekaid\
				GROUP BY heureka.categorytext\
				ORDER BY count DESC\
				LIMIT 1';
		this.connection.query(sql, values, (e: Error, result: any) => {
			if (e) return callback(e);
			callback(null, result.rows.length ? result.rows[0].category_text : null);
		});
	}

	getName(categoryId: number, callback: (e: Error, categoryName?: string) => void): void {
		this.db.query('MATCH (a:CATEGORY) WHERE (a.categoryId = {categoryId} ) RETURN a.name', {
			categoryId: categoryId
		}, (e: Error, res: any) => {
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
		}, (e: Error, res: any) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.categoryChangeInSale']);
		});
	}
}
