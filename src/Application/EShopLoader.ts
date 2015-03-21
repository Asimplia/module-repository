
import mongoose = require('mongoose');
import EShop = require('../Entity/Application/EShop');
import List = require('../Entity/List');

export = EShopLoader;
class EShopLoader {

	static $inject = [
		'Definition.Application.EShopModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {}

	getById(id: number, callback: (e: Error, eShop?: EShop) => void) {
		this.model.findOne({ 'id': id }, (e: Error, object: any) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, EShop.fromObject(object));
		});
	}

	getCount(callback: (e: Error, count?: number) => void): void {
		this.model.count({}, (e: Error, count: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(e, count);
		});
	}

	getMaxDateCreated(callback: (e: Error, maxDateCreated?: Date) => void) {
		this.model.findOne({}).sort({ dateCreated: -1 }).exec((e: Error, object: any) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, object.dateCreated);
		});
	}

	getList(callback: (e: Error, eSholList?: List<EShop>) => void) {
		this.model.find({}).exec((e: Error, objects: any[]) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, new List<EShop>(objects, EShop.fromObject));
		});
	}
}
