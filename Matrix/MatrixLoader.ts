import AsimpliaRepository = require('../index');
import List = require('../Entity/List');
import Matrix = require('../Entity/Matrix/Matrix');
import Signal = require('../Entity/Matrix/Signal');
import Factor = require('../Entity/Factor/Factor');
import MatrixFactory = require('../Entity/Matrix/MatrixFactory');

export = MatrixLoader;
class MatrixLoader {

	private connection;

	constructor() {
		AsimpliaRepository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	getListByEShopId(eShopId:number, callback: (e: Error, recordList?: List<Matrix>) => void) {
		this.connection.query(
			'SELECT * FROM analytical.'+Matrix.TABLE_NAME+' LEFT JOIN analytical.'+Signal.TABLE_NAME+' USING ('+Matrix.COLUMN_MATRIX_ID+') '
				+'WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1 AND '+Signal.COLUMN_SIGNAL_ID+' IS NULL', [
			eShopId
		], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	getListByEShopIdAndProductIdForLoad(eShopId: number, productId: number, loadId: number, callback:(e:Error, recordList?:List<Matrix>) => void) {
		this.connection.query(
			'SELECT * FROM analytical.'+Matrix.TABLE_NAME+' LEFT JOIN analytical.'+Signal.TABLE_NAME+' USING ('+Matrix.COLUMN_MATRIX_ID+') '
				+' WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1 '
				+' AND '+Matrix.COLUMN_LOAD_ID+' = $2 '
				+' AND '+Matrix.COLUMN_PRODUCT_ID+' = $3 '
				+' AND '+Signal.COLUMN_SIGNAL_ID+' IS NULL ', [
				eShopId, loadId, productId
			], (e, result) => {
				this.createListByResult(e, result, callback);
			});
	}

	getListByEShopIdAndCustomerIdForLoad(eShopId: number, customerId: number, loadId: number, callback:(e:Error, recordList?:List<Matrix>) => void) {
		this.connection.query(
			'SELECT * FROM analytical.'+Matrix.TABLE_NAME+' LEFT JOIN analytical.'+Signal.TABLE_NAME+' USING ('+Matrix.COLUMN_MATRIX_ID+') '
				+' WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1 '
				+' AND '+Matrix.COLUMN_LOAD_ID+' = $2 '
				+' AND '+Matrix.COLUMN_CUSTOMER_ID+' = $3 '
				+' AND '+Signal.COLUMN_SIGNAL_ID+' IS NULL ', [
				eShopId, loadId, customerId
			], (e, result) => {
				this.createListByResult(e, result, callback);
			});
	}

	getListByEShopIdAndChannelIdForLoad(eShopId: number, channelId: number, loadId: number, callback:(e:Error, recordList?:List<Matrix>) => void) {
		this.connection.query(
			'SELECT * FROM analytical.'+Matrix.TABLE_NAME+' LEFT JOIN analytical.'+Signal.TABLE_NAME+' USING ('+Matrix.COLUMN_MATRIX_ID+') '
				+' WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1 '
				+' AND '+Matrix.COLUMN_LOAD_ID+' = $2 '
				+' AND '+Matrix.COLUMN_CHANNEL_ID+' = $3 '
				+' AND '+Signal.COLUMN_SIGNAL_ID+' IS NULL ', [
				eShopId, loadId, channelId
			], (e, result) => {
				this.createListByResult(e, result, callback);
			});
	}

	getListByEShopIdAndLoadIdLimited(eShopId: number, loadId: number, limit: number, offset: number, callback: (e: Error, recordList?: List<Matrix>) => void) {
		this.connection.query(
			'SELECT * FROM analytical.'+Matrix.TABLE_NAME+' '
				+' WHERE '+Matrix.COLUMN_E_SHOP_ID+' = $1 '
				+' AND '+Matrix.COLUMN_LOAD_ID+' = $2 '
				+' LIMIT $3 OFFSET $4 ', [
			eShopId, loadId, limit, offset
		], (e, result) => {
			this.createListByResult(e, result, callback);
		});
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
