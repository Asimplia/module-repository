﻿
import List = require('../Entity/List');
import Matrix = require('../Entity/Matrix/Matrix');
import Signal = require('../Entity/Matrix/Signal');
import Product = require('../Entity/EShop/Product');
import Customer = require('../Entity/EShop/Customer');
import Channel = require('../Entity/EShop/Channel');
import Category = require('../Entity/EShop/Category');
import EShop = require('../Entity/EShop/EShop');
import EntityPreparer = require('../Entity/EntityPreparer');
import LoadLog = require('../Entity/Load/LoadLog');
import SqlExecutor = require('../Util/SqlExecutor');

export = MatrixLoader;
class MatrixLoader {

	private sqlExecutor: SqlExecutor;

	static $inject = [
		'connection.postgres'
	];
	constructor(
		private connection: any
	) {
		this.sqlExecutor = new SqlExecutor(connection, Matrix, Matrix.COLUMN_MATRIX_ID, 'id');
	}

	getListNotSignal(eShopId: number, loadId: number, callback: (e: Error, recordList?: List<Matrix>) => void) {
		var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom()
			+ ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 '
			+ ' AND ' + Signal.TABLE_NAME + '.' + Signal.COLUMN_SIGNAL_ID + ' IS NULL';
		this.connection.query(sql, [
			eShopId, loadId
		], (e: Error, result: any) => {
			this.sqlExecutor.createListByResult(e, result, callback);
		});
	}

	getListByEShopIdAndProductIdForLoad(
		eShopId: number, productId: number, loadId: number, callback: (e: Error, recordList?: List<Matrix>) => void
	) {
		var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom()
			+ ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_PRODUCT_ID + ' = $3 '
			+ ' AND ' + Signal.TABLE_NAME + '.' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ';
		this.connection.query(sql, [
				eShopId, loadId, productId
			], (e: Error, result: any) => {
				this.sqlExecutor.createListByResult(e, result, callback);
			});
	}

	getListByEShopIdAndCustomerIdForLoad(
		eShopId: number, customerId: number, loadId: number, callback: (e: Error, recordList?: List<Matrix>) => void
	) {
		var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom()
			+ ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CUSTOMER_ID + ' = $3 '
			+ ' AND ' + Signal.TABLE_NAME + '.' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ';
		this.connection.query(sql, [
				eShopId, loadId, customerId
			], (e: Error, result: any) => {
				this.sqlExecutor.createListByResult(e, result, callback);
			});
	}

	getListByEShopIdAndChannelIdForLoad(
		eShopId: number, channelId: number, loadId: number, callback: (e: Error, recordList?: List<Matrix>) => void
	) {
		var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom()
			+ ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANNEL_ID + ' = $3 '
			+ ' AND ' + Signal.TABLE_NAME + '.' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ';
		this.connection.query(sql, [
				eShopId, loadId, channelId
			], (e: Error, result: any) => {
				this.sqlExecutor.createListByResult(e, result, callback);
			});
	}

	getListByEShopIdAndCategoryIdForLoad(
		eShopId: number, categoryId: number, loadId: number, callback: (e: Error, recordList?: List<Matrix>) => void
	) {
		var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom()
			+ ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CATEGORY_ID + ' = $3 '
			+ ' AND ' + Signal.TABLE_NAME + '.' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ';
		this.connection.query(sql, [
				eShopId, loadId, categoryId
			], (e: Error, result: any) => {
				this.sqlExecutor.createListByResult(e, result, callback);
			});
	}

	getListByEShopIdAndOtherNullForLoad(eShopId: number, loadId: number, callback: (e: Error, recordList?: List<Matrix>) => void) {
		var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom()
			+ ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_PRODUCT_ID + ' IS NULL '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CUSTOMER_ID + ' IS NULL '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CATEGORY_ID + ' IS NULL '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANNEL_ID + ' IS NULL '
			+ ' AND ' + Signal.TABLE_NAME + '.' + Signal.COLUMN_SIGNAL_ID + ' IS NULL ';
		this.connection.query(sql, [
				eShopId, loadId
			], (e: Error, result: any) => {
				this.sqlExecutor.createListByResult(e, result, callback);
			});
	}

	getListByEShopIdAndLoadId(
		eShopId: number,
		loadId: number,
		limit: number,
		offset: number,
		filter: { productIds?: number[]; customerIds?: number[]; channelIds?: number[]; categoryIds?: number[] },
		callback: (e: Error, recordList?: List<Matrix>) => void
	) {
		var filterWhere = '';
		if (filter.productIds && filter.productIds.length > 0) {
			filterWhere += ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_PRODUCT_ID + ' IN (' + filter.productIds.join(', ') + ') ';
		}
		if (filter.customerIds && filter.customerIds.length > 0) {
			filterWhere += ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CUSTOMER_ID + ' IN (' + filter.customerIds.join(', ') + ') ';
		}
		if (filter.channelIds && filter.channelIds.length > 0) {
			filterWhere += ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CHANNEL_ID + ' IN (' + filter.channelIds.join(', ') + ') ';
		}
		if (filter.categoryIds && filter.categoryIds.length > 0) {
			filterWhere += ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_CATEGORY_ID + ' IN (' + filter.categoryIds.join(', ') + ') ';
		}
		var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom()
			+ ' WHERE ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_E_SHOP_ID + ' = $1 '
			+ ' AND ' + Matrix.TABLE_NAME + '.' + Matrix.COLUMN_LOAD_ID + ' = $2 '
			+ filterWhere
			+ ' LIMIT $3 OFFSET $4 ';
		this.connection.query(sql, [
			eShopId, loadId, limit, offset
		], (e: Error, result: any) => {
			this.sqlExecutor.createListByResult(e, result, callback);
		});
	}

	getDailyCount(countDays: number, callback: (e: Error, data?: { date: Date; count: number }[]) => void) {
		var sql = 'SELECT DATE_TRUNC(\'day\', ' + LoadLog.COLUMN_DATELOADED + ') AS date, '
			+ ' COUNT(' + Matrix.COLUMN_MATRIX_ID + ') AS count '
			+ ' FROM ' + Matrix.TABLE_NAME + ' '
			+ ' JOIN ' + LoadLog.TABLE_NAME + ' USING (' + Matrix.COLUMN_LOAD_ID + ', ' + Matrix.COLUMN_E_SHOP_ID + ') '
			+ ' GROUP BY date '
			+ ' ORDER BY date DESC '
			+ ' LIMIT $1 ';
		this.connection.query(sql, [
			countDays
		], (e: Error, result: any) => {
			if (e) {
				callback(e);
				return;
			}
			var data = [];
			result.rows.forEach((row: any) => {
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
			where.push(Matrix.TABLE_NAME + '.' + Matrix.COLUMN_DATE_VALID + ' > $1::timestamp');
			parameters.push(validFrom);
		}
		var sql = 'SELECT ' + this.getSelect() + ' FROM ' + this.getFrom()
			+ ' WHERE ' + where.join(' AND ');
		this.connection.query(sql, parameters, (e: Error, result: any) => {
			this.sqlExecutor.createListByResult(e, result, callback);
		});
	}

	private getSelect() {
		return EntityPreparer.getColumnsAsPrefixedAlias(Matrix).join(', ') + ', '
			+ EntityPreparer.getColumnsAsPrefixedAlias(Signal).join(', ') + ', '
			+ EntityPreparer.getColumnsAsPrefixedAlias(Product).join(', ') + ', '
			+ EntityPreparer.getColumnsAsPrefixedAlias(Customer).join(', ') + ', '
			+ EntityPreparer.getColumnsAsPrefixedAlias(Channel).join(', ') + ', '
			+ EntityPreparer.getColumnsAsPrefixedAlias(Category).join(', ') + ', '
			+ EntityPreparer.getColumnsAsPrefixedAlias(EShop).join(', ') + ' ';
	}

	private getFrom() {
		return '' + Matrix.TABLE_NAME + ' '
			+ ' LEFT JOIN ' + Signal.TABLE_NAME + ' USING (' + Matrix.COLUMN_MATRIX_ID + ') '
			+ ' LEFT JOIN ' + Product.TABLE_NAME + ' USING (' + Product.COLUMN_PRODUCT_ID + ', ' + Product.COLUMN_E_SHOP_ID + ') '
			+ ' LEFT JOIN ' + Customer.TABLE_NAME + ' USING (' + Customer.COLUMN_CUSTOMER_ID + ', ' + Customer.COLUMN_E_SHOP_ID + ') '
			+ ' LEFT JOIN ' + Channel.TABLE_NAME + ' USING (' + Channel.COLUMN_CHANNEL_ID + ', ' + Channel.COLUMN_E_SHOP_ID + ') '
			+ ' LEFT JOIN ' + Category.TABLE_NAME + ' USING (' + Category.COLUMN_CATEGORY_ID + ', ' + Category.COLUMN_E_SHOP_ID + ') '
			+ ' LEFT JOIN ' + EShop.TABLE_NAME + ' USING (' + EShop.COLUMN_E_SHOP_ID + ') ';
	}
}
