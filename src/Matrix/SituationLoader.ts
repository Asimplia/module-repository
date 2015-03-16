
import Repository = require('../index');
import Signal = require('../Entity/Matrix/Signal');
import Situation = require('../Entity/Matrix/Situation');
import Matrix = require('../Entity/Matrix/Matrix');
import Product = require('../Entity/EShop/Product');
import Customer = require('../Entity/EShop/Customer');
import Channel = require('../Entity/EShop/Channel');
import EShop = require('../Entity/EShop/EShop');
import List = require('../Entity/List');
import Category = require('../Entity/EShop/Category');
import EntityPreparer = require('../Entity/EntityPreparer');
import SqlExecutor = require('../Util/SqlExecutor');
import moment = require('moment');

export = SituationLoader;
class SituationLoader {
	
	private sqlExecutor: SqlExecutor;

	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, Situation, Situation.COLUMN_SITUATION_ID, 'id');
	}

	getListNotProcessedSuggestionResult(eShopId: number, loadId: number, callback: (e: Error, situationList?: List<Situation>) => void) {
		this.connection.query('SELECT '+this.getSelect()+' FROM '+this.getFrom()
			+' WHERE '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' AND '+Situation.TABLE_NAME+'.'+Situation.COLUMN_DATE_SUGGESTION_RESULT_PROCESSED+' IS NULL', [
			eShopId, loadId
		], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	getListNotProcessedChecklist(eShopId: number, loadId: number, callback: (e: Error, situationList?: List<Situation>) => void) {
		this.connection.query('SELECT '+this.getSelect()+' FROM '+this.getFrom()
			+' WHERE '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_LOAD_ID+' = $2 '
			+' AND '+Situation.TABLE_NAME+'.'+Situation.COLUMN_DATE_CHECKLIST_PROCESSED+' IS NULL', [
			eShopId, loadId
		], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	getListByEShopIdAndLoadIdLimited(eShopId: number, loadId: number, limit: number, offset: number, filter: { productIds?: number[]; customerIds?: number[]; channelIds?: number[] }, callback: (e: Error, recordList?: List<Situation>) => void) {
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
		this.connection.query('SELECT '+this.getSelect()+' FROM '+this.getFrom()
			+' WHERE '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_E_SHOP_ID+' = $1 '
			+' AND '+Matrix.TABLE_NAME+'.'+Matrix.COLUMN_LOAD_ID+' = $2 '
			+filterWhere
			+' LIMIT $3 OFFSET $4 ', [
			eShopId, loadId, limit, offset
		], (e, result) => {
			this.createListByResult(e, result, callback);
		});
	}

	private createListByResult(e: Error, result: any, callback: (e: Error, recordList?: List<Situation>) => void) {
		if (e) {
			callback(e);
			return;
		}
		var situationList = new List<Situation>();
		result.rows.forEach((row) => {
			var situation = situationList.find((situation: Situation) => {
				return situation.Id == row[Situation.TABLE_NAME + '.' + Situation.COLUMN_SITUATION_ID];
			});
			if (!situation) {
				situation = Situation.fromRow(row);
				situationList.push(situation);
			}
			var signal = Signal.fromRow(row);
			situation.SignalList.push(signal);
		});
		callback(null, situationList);
	}

	private getSelect() {
		return EntityPreparer.getColumnsAsPrefixedAlias(Matrix).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Signal).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Situation).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Product).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Customer).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Channel).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(Category).join(', ')+', '
			+EntityPreparer.getColumnsAsPrefixedAlias(EShop).join(', ')+' ';
	}

	private getFrom() {
		return Situation.TABLE_NAME+' '
			+' JOIN '+Signal.TABLE_NAME+' USING ('+Signal.COLUMN_SITUATION_ID+') '
			+' JOIN '+Matrix.TABLE_NAME+' USING ('+Signal.COLUMN_MATRIX_ID+') '
			+' LEFT JOIN '+Product.TABLE_NAME+' USING ('+Product.COLUMN_PRODUCT_ID+', '+Product.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN '+Customer.TABLE_NAME+' USING ('+Customer.COLUMN_CUSTOMER_ID+', '+Customer.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN '+Channel.TABLE_NAME+' USING ('+Channel.COLUMN_CHANNEL_ID+', '+Channel.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN '+Category.TABLE_NAME+' USING ('+Category.COLUMN_CATEGORY_ID+', '+Category.COLUMN_E_SHOP_ID+') '
			+' LEFT JOIN '+EShop.TABLE_NAME+' USING ('+EShop.COLUMN_E_SHOP_ID+') ';
	}

}
