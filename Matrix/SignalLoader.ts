
import moment = require('moment');
import AsimpliaRepository = require('../index');
import Signal = require('../Entity/Matrix/Signal');
import Matrix = require('../Entity/Matrix/Matrix');
import Product = require('../Entity/EShop/Product');
import Customer = require('../Entity/EShop/Customer');
import Channel = require('../Entity/EShop/Channel');
import List = require('../Entity/List');

export = SignalLoader;
class SignalLoader {

	private connection;

	constructor() {
		AsimpliaRepository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListByEShopId(eShopId: number, callback: (e: Error, signalList?: List<Signal>) => void) {
		this.connection.query('SELECT * FROM analytical.'+Signal.TABLE_NAME+' '
			+' JOIN analytical.'+Matrix.TABLE_NAME+' USING ('+Signal.COLUMN_MATRIX_ID+') '
			+' LEFT JOIN warehouse.'+Product.TABLE_NAME+' USING ('+Product.COLUMN_PRODUCT_ID+', '+Product.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN warehouse.'+Customer.TABLE_NAME+' USING ('+Customer.COLUMN_CUSTOMER_ID+', '+Customer.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN warehouse.'+Channel.TABLE_NAME+' USING ('+Channel.COLUMN_CHANNEL_ID+', '+Channel.COLUMN_E_SHOP_ID+') '
			+' WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1', [
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

	getListWithoutSituation(eShopId: number, callback: (e: Error, signalList?: List<Signal>) => void) {
		this.connection.query('SELECT * FROM analytical.'+Signal.TABLE_NAME+' '
			+' JOIN analytical.'+Matrix.TABLE_NAME+' USING ('+Signal.COLUMN_MATRIX_ID+') '
			+' LEFT JOIN warehouse.'+Product.TABLE_NAME+' USING ('+Product.COLUMN_PRODUCT_ID+', '+Product.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN warehouse.'+Customer.TABLE_NAME+' USING ('+Customer.COLUMN_CUSTOMER_ID+', '+Customer.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN warehouse.'+Channel.TABLE_NAME+' USING ('+Channel.COLUMN_CHANNEL_ID+', '+Channel.COLUMN_E_SHOP_ID+') '
			+' WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1 AND '+Signal.COLUMN_SITUATION_ID+' IS NULL', [
			eShopId
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
			filterWhere += ' AND analytical.'+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_PRODUCT_ID+' IN ('+filter.productIds.join(', ')+') ';
		}
		if (filter.customerIds && filter.customerIds.length > 0) {
			filterWhere += ' AND analytical.'+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_CUSTOMER_ID+' IN ('+filter.customerIds.join(', ')+') ';
		}
		if (filter.channelIds && filter.channelIds.length > 0) {
			filterWhere += ' AND analytical.'+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_CHANNEL_ID+' IN ('+filter.channelIds.join(', ')+') ';
		}
		this.connection.query(
			'SELECT * FROM analytical.'+Signal.TABLE_NAME+' '
				+' JOIN analytical.'+Matrix.TABLE_NAME+' USING ('+Signal.COLUMN_MATRIX_ID+') '
				+' LEFT JOIN warehouse.'+Product.TABLE_NAME+' USING ('+Product.COLUMN_PRODUCT_ID+', '+Product.COLUMN_E_SHOP_ID+') '
				+' LEFT JOIN warehouse.'+Customer.TABLE_NAME+' USING ('+Customer.COLUMN_CUSTOMER_ID+', '+Customer.COLUMN_E_SHOP_ID+') '
				+' LEFT JOIN warehouse.'+Channel.TABLE_NAME+' USING ('+Channel.COLUMN_CHANNEL_ID+', '+Channel.COLUMN_E_SHOP_ID+') '
				+' WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1 '
				+' AND '+Matrix.COLUMN_LOAD_ID+' = $2 '
				+filterWhere
				+' LIMIT $3 OFFSET $4 ', [
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
}
