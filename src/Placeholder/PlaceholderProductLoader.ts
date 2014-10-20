
/// <reference path="../../typings/underscore/underscore.d.ts" />

import Repository = require('../index');
import _ = require('underscore');

export = PlaceholderProductLoader;
class PlaceholderProductLoader {

	private db;

	constructor() {
		Repository.getGraphDatabase((db: any) => {
			this.db = db;
		});
	}

	getName(productId: number, callback: (e: Error, productName?: string) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.name', {
			productId: productId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.name']);
		});
	}

	getPrice(productId: number, callback: (e: Error, price?: number) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productPrice', {
			productId: productId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.productPrice']);
		});
	}

	getPriceChange(productId: number, callback: (e: Error, priceChange?: number) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productPriceChange', {
			productId: productId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.productPriceChange']);
		});
	}

	getPackageOption(productId: number, callback: (e: Error, productNames?: string[]) => void): void {
		this.db.query('MATCH (a:PRODUCT)-->(b:ORDER_ITEM)-->(c:ORDER)<--(d:ORDER_ITEM)--(e:PRODUCT) WHERE (a.productId = {productId}) RETURN e', {
			productId: productId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			var productNames = _.map(res, (row) => {
				return row['e'];
			});
			callback(null, productNames);
		});
	}

	getSku(productId: number, callback: (e: Error, productSku?: number) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productSku', {
			productId: productId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.productSku']);
		});
	}

	getStokingTime(productId: number, callback: (e: Error, stokingTime?: number) => void): void {
		this.db.query('', { // TODO
			productId: productId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['']);
		});
	}

	getMarginRate(productId: number, callback: (e: Error, marginRate?: number) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.productMarginRate', {
			productId: productId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.productMarginRate']);
		});
	}

	getCustomersForProduct(productId: number, callback: (e: Error, customers?: string[]) => void): void {
		this.db.query('MATCH (a:PRODUCT {productId: {productId} })-[*2]->(c:ORDER)<-[*2]-(e:PRODUCT) WITH e MATCH (x:CUSTOMER)<--(c:ORDER)<-[*2]-(e) WHERE NOT (e.productId =  {productId} ) RETURN DISTINCT x', {
			productId: productId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			var customers = _.map(res, (row) => {
				return row['x'];
			});
			callback(null, customers);
		});
	}

	getConversionRate(productId: number, callback: (e: Error, conversionRate?: number) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = {productId} ) RETURN a.conversionRate', {
			productId: productId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.conversionRate']);
		});
	}

	getDiscountValue(productId: number, callback: (e: Error, discount?: number) => void): void {
		this.db.query('MATCH (a:PRODUCT) WHERE (a.productId = %product_id ) RETURN a.discount', {
			productId: productId
		}, (e: Error, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, res.pop()['a.discount']);
		});
	}

}