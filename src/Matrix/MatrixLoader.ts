
import Repository = require('../index');
import List = require('../Entity/List');
import Matrix = require('../Entity/Matrix/Matrix');
import Signal = require('../Entity/Matrix/Signal');
import Product = require('../Entity/EShop/Product');
import Customer = require('../Entity/EShop/Customer');
import Channel = require('../Entity/EShop/Channel');
import Category = require('../Entity/EShop/Category');
import Factor = require('../Entity/Factor/Factor');
import MatrixFactory = require('../Entity/Matrix/MatrixFactory');
import EntityPreparer = require('../Entity/EntityPreparer');
import LoadLog = require('../Entity/Load/LoadLog');

export = MatrixLoader;
class MatrixLoader {

	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListNotSignal(eShopId: number, loadId: number, callback: (e: Error, recordList?: List<Matrix>) => void) {
		var sql = 'SELECT '+this.getSelect()+' FROM '+this.getFrom()
			+' WHERE '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' AND '+Signal.TABLE_NAME+'.'+Signal.COLUMN_SIGNAL_ID+' IS NULL';
		this.connection.query(sql, [
			eShopId, loadId
		], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	getListByEShopIdAndProductIdForLoad(eShopId: number, productId: number, loadId: number, callback:(e:Error, recordList?:List<Matrix>) => void) {
		var sql = 'SELECT '+this.getSelect()+' FROM '+this.getFrom()
			+' WHERE '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_PRODUCT_ID+' = $3 '
			+' AND '+Signal.TABLE_NAME+'.'+Signal.COLUMN_SIGNAL_ID+' IS NULL ';
		this.connection.query(sql, [
				eShopId, loadId, productId
			], (e, result) => {
				this.createListByResult(e, result, callback);
			});
	}

	getListByEShopIdAndCustomerIdForLoad(eShopId: number, customerId: number, loadId: number, callback:(e:Error, recordList?:List<Matrix>) => void) {
		var sql = 'SELECT '+this.getSelect()+' FROM '+this.getFrom()
			+' WHERE '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_CUSTOMER_ID+' = $3 '
			+' AND '+Signal.TABLE_NAME+'.'+Signal.COLUMN_SIGNAL_ID+' IS NULL ';
		this.connection.query(sql, [
				eShopId, loadId, customerId
			], (e, result) => {
				this.createListByResult(e, result, callback);
			});
	}

	getListByEShopIdAndChannelIdForLoad(eShopId: number, channelId: number, loadId: number, callback:(e:Error, recordList?:List<Matrix>) => void) {
		var sql = 'SELECT '+this.getSelect()+' FROM '+this.getFrom()
			+' WHERE '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_CHANNEL_ID+' = $3 '
			+' AND '+Signal.TABLE_NAME+'.'+Signal.COLUMN_SIGNAL_ID+' IS NULL ';
		this.connection.query(sql, [
				eShopId, loadId, channelId
			], (e, result) => {
				this.createListByResult(e, result, callback);
			});
	}

	getListByEShopIdAndCategoryIdForLoad(eShopId: number, categoryId: number, loadId: number, callback:(e:Error, recordList?:List<Matrix>) => void) {
		var sql = 'SELECT '+this.getSelect()+' FROM '+this.getFrom()
			+' WHERE '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_CATEGORY_ID+' = $3 '
			+' AND '+Signal.TABLE_NAME+'.'+Signal.COLUMN_SIGNAL_ID+' IS NULL ';
		this.connection.query(sql, [
				eShopId, loadId, categoryId
			], (e, result) => {
				this.createListByResult(e, result, callback);
			});
	}

	getListByEShopIdAndLoadIdLimited(
		eShopId: number, 
		loadId: number, 
		limit: number, 
		offset: number, 
		filter: { productIds?: number[]; customerIds?: number[]; channelIds?: number[]; categoryIds?: number[] }, 
		callback: (e: Error, recordList?: List<Matrix>) => void
	) {
		var filterWhere = '';
		if (filter.productIds && filter.productIds.length > 0) {
			filterWhere += ' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_PRODUCT_ID+' IN ('+filter.productIds.join(', ')+') ';
		}
		if (filter.customerIds && filter.customerIds.length > 0) {
			filterWhere += ' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_CUSTOMER_ID+' IN ('+filter.customerIds.join(', ')+') ';
		}
		if (filter.channelIds && filter.channelIds.length > 0) {
			filterWhere += ' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_CHANNEL_ID+' IN ('+filter.channelIds.join(', ')+') ';
		}
		if (filter.categoryIds && filter.categoryIds.length > 0) {
			filterWhere += ' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_CATEGORY_ID+' IN ('+filter.categoryIds.join(', ')+') ';
		}
		var sql = 'SELECT '+this.getSelect()+' FROM '+this.getFrom()
			+' WHERE '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_LOAD_ID+' = $2 '
			+filterWhere
			+' LIMIT $3 OFFSET $4 ';
		this.connection.query(sql, [
			eShopId, loadId, limit, offset
		], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	getDailyCount(countDays: number, callback: (e: Error, data?: { date: Date; count: number }[]) => void) {
		var sql = "SELECT DATE_TRUNC('day', "+LoadLog.COLUMN_DATELOADED+") AS date, "
			+" COUNT("+Matrix.COLUMN_MATRIX_ID+") AS count "
			+' FROM '+Matrix.TABLE_NAME+' '
			+' JOIN '+LoadLog.TABLE_NAME+' USING ('+Matrix.COLUMN_LOAD_ID+', '+Matrix.COLUMN_E_SHOP_ID+') '
			+' GROUP BY date '
			+' ORDER BY date DESC '
			+' LIMIT $1 ';
		this.connection.query(sql, [
			countDays
		], (e, result) => {
			if (e) {
				callback(e);
				return;
			}
			var data = [];
			result.rows.forEach((row) => {
				data.unshift({
					date: EntityPreparer.date(row.date),
					count: row.count
				});
			});
			callback(null, data);
		});
	}

	getListValidFrom(validFrom: Date, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		var where = ['TRUE'];
		var parameters = [];
		if (validFrom) {
			where.push(Matrix.TABLE_NAME+'.'+Matrix.COLUMN_DATE_VALID+' > $1::timestamp');
			parameters.push(validFrom);
		}
		var sql = 'SELECT '+this.getSelect()+' FROM '+this.getFrom()
			+' WHERE '+where.join(' AND ');
		this.connection.query(sql, parameters, (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	private getSelect() {
		return EntityPreparer.getColumnsAsPrefixedAlias(Matrix).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Signal).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Product).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Customer).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Channel).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Category).join(', ')+' ';
	}

	private getFrom() {
		return ''+Matrix.TABLE_NAME+' '
			+' LEFT JOIN '+Signal.TABLE_NAME+' USING ('+Matrix.COLUMN_MATRIX_ID+') '
			+' LEFT JOIN '+Product.TABLE_NAME+' USING ('+Product.COLUMN_PRODUCT_ID+', '+Product.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN '+Customer.TABLE_NAME+' USING ('+Customer.COLUMN_CUSTOMER_ID+', '+Customer.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN '+Channel.TABLE_NAME+' USING ('+Channel.COLUMN_CHANNEL_ID+', '+Channel.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN '+Category.TABLE_NAME+' USING ('+Category.COLUMN_CATEGORY_ID+', '+Category.COLUMN_E_SHOP_ID+') ';
	}

	private createListByResult(e: Error, result: any, callback: (e: Error, recordList?: List<Matrix>) => void) {
		if (e) {
			console.log(e);
			callback(e);
			return;
		}
		var list = new List<Matrix>();
		result.rows.forEach((row) => {
			var record = MatrixFactory.createMatrixFromRow(row);
			list.push(record);
		});
		callback(null, list);
	}

}
