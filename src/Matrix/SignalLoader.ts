
import AsimpliaRepository = require('../index');
import Signal = require('../Entity/Matrix/Signal');
import Matrix = require('../Entity/Matrix/Matrix');
import Product = require('../Entity/EShop/Product');
import Customer = require('../Entity/EShop/Customer');
import Channel = require('../Entity/EShop/Channel');
import EShop = require('../Entity/EShop/EShop');
import List = require('../Entity/List');
import Category = require('../Entity/EShop/Category');
import EntityPreparer = require('../Entity/EntityPreparer');
import LoadLog = require('../Entity/Load/LoadLog');

export = SignalLoader;
class SignalLoader {

	private connection;

	constructor() {
		AsimpliaRepository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListByEShopId(eShopId: number, callback: (e: Error, signalList?: List<Signal>) => void) {
		var sql = 'SELECT '+this.getSelect()+' FROM '+this.getFrom()
			+' WHERE '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1';
		this.connection.query(sql, [
			eShopId
		], (e, result) => {
			if (e) {
				callback(e);
				return;
			}
			var list = new List<Signal>();
			result.rows.forEach((row) => {
				var signal = Signal.fromRow(row);
				list.push(signal);
			});
			callback(null, list);
		});
	}

	getListWithoutSituation(eShopId: number, loadId: number, callback: (e: Error, signalList?: List<Signal>) => void) {
		var sql = 'SELECT '+this.getSelect()+' FROM '+this.getFrom()
			+' WHERE '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' AND '+Signal.TABLE_NAME+'.'+Signal.COLUMN_SITUATION_ID+' IS NULL';
		this.connection.query(sql, [
			eShopId, loadId
		], (e, result) => {
			if (e) {
				console.log(e);
				callback(e);
				return;
			}
			var list = new List<Signal>();
			result.rows.forEach((row) => {
				var signal = Signal.fromRow(row);
				list.push(signal);
			});
			callback(null, list);
		});
	}

	getListByEShopIdAndLoadIdLimited(eShopId: number, loadId: number, limit: number, offset: number, filter: { productIds?: number[]; customerIds?: number[]; channelIds?: number[] }, callback: (e: Error, recordList?: List<Signal>) => void) {
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
		var sql = 'SELECT '+this.getSelect()+' FROM '+this.getFrom()
			+' WHERE '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_LOAD_ID+' = $2 '
			+filterWhere
			+' LIMIT $3 OFFSET $4 ';
		this.connection.query(sql, [
			eShopId, loadId, limit, offset
		], (e, result) => {
			if (e) {
				console.log(e);
				callback(e);
				return;
			}
			var list = new List<Signal>();
			result.rows.forEach((row) => {
				var signal = Signal.fromRow(row);
				list.push(signal);
			});
			callback(null, list);
		});
	}

	getDailyCount(countDays: number, callback: (e: Error, data?: { date: Date; count: number }[]) => void) {
		var sql = "SELECT DATE_TRUNC('day', "+LoadLog.COLUMN_DATELOADED+") AS date, "
			+" COUNT("+Matrix.COLUMN_MATRIX_ID+") AS count "
			+' FROM '+Signal.TABLE_NAME+' '
			+' JOIN '+Matrix.TABLE_NAME+' USING ('+Matrix.COLUMN_MATRIX_ID+') '
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

	private getSelect() {
		return EntityPreparer.getColumnsAsPrefixedAlias(Matrix).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Signal).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Product).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Customer).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Channel).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Category).join(', ')+' '
			+EntityPreparer.getColumnsAsPrefixedAlias(EShop).join(', ')+' ';
	}

	private getFrom() {
		return Signal.TABLE_NAME+' '
			+' JOIN '+Matrix.TABLE_NAME+' USING ('+Signal.COLUMN_MATRIX_ID+') '
			+' LEFT JOIN '+Product.TABLE_NAME+' USING ('+Product.COLUMN_PRODUCT_ID+', '+Product.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN '+Customer.TABLE_NAME+' USING ('+Customer.COLUMN_CUSTOMER_ID+', '+Customer.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN '+Channel.TABLE_NAME+' USING ('+Channel.COLUMN_CHANNEL_ID+', '+Channel.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN '+Category.TABLE_NAME+' USING ('+Category.COLUMN_CATEGORY_ID+', '+Category.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN '+EShop.TABLE_NAME+' USING ('+EShop.COLUMN_E_SHOP_ID+') ';
	}
}