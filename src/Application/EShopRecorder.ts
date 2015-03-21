
import mongoose = require('mongoose');
import EShop = require('../Entity/Application/EShop');
import List = require('../Entity/List');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = EShopRecorder;
class EShopRecorder {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Application.EShopModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, EShop);
	}

	insertOrUpdateList(eShopList: List<EShop>, callback: (e: Error, eShopList?: List<EShop>) => void) {
		this.documentExecutor.insertOrUpdateList(eShopList, callback);
	}

	insertOrUpdate(eShop: EShop, callback: (e: Error, eShop?: EShop) => void) {
		this.documentExecutor.insertOrUpdate(eShop, callback);
	}
}
