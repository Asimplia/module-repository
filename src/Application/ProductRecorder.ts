
import mongoose = require('mongoose');
import Product = require('../Entity/Application/Product');
import List = require('../Entity/List');
import ProductModel = require('../Definition/Application/ProductModel');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = ProductRecorder;
class ProductRecorder {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Application.ProductModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, Product);
	}

	insertOrUpdateList(productList: List<Product>, callback: (e: Error, productList?: List<Product>) => void) {
		this.documentExecutor.insertOrUpdateList(productList, callback);
	}

	insertOrUpdate(product: Product, callback: (e: Error, product?: Product) => void) {
		this.documentExecutor.insertOrUpdate(product, callback);
	}
}
