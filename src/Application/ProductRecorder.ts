
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import AbstractRecorder = require('../AbstractRecorder');
import Product = require('../Entity/Application/Product');
import List = require('../Entity/List');
import ProductModel = require('../Definition/Application/ProductModel');

export = ProductRecorder;
class ProductRecorder extends AbstractRecorder {
	
	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.model = ProductModel;
	}

	insertOrUpdateList(productList: List<Product>, callback: (e: Error, productList?: List<Product>) => void) {
		productList.createEach().on('item', (product: Product, next) => {
			this.insertOrUpdate(product, next);
		})
		.on('error', (e: Error) => {
			callback(e);
		})
		.on('end', () => {
			callback(null, productList);
		});
	}

	insertOrUpdate(product: Product, callback: (e: Error, product?: Product) => void) {
		this.model.findOne({ id: product.Id, eShopId: product.EShopId }, (e, doc: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!doc) {
				doc = new this.model({});
				this.getNextId(this.model, (id) => {
					product.Id = id;
					this.update(doc, Product.fromObject, product, callback);
				});
				return;
			}
			this.update(doc, Product.fromObject, product, callback);
		});
	}
}
