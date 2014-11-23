
import mongoose = require('mongoose');
import Matrix = require('../Entity/Application/Matrix');
import AuthTypeEnum = require('../Entity/Application/AuthTypeEnum');
import MatrixModel = require('../Definition/Application/MatrixModel');
import List = require('../Entity/List');
import SectionEnum = require('../Entity/Section/SectionEnum');
import SectionFactory = require('../Entity/Section/SectionFactory');

export = MatrixLoader;
class MatrixLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = MatrixModel;
	}

	getListLastByProductId(eShopId: number, productId: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		var conditions = {
			"eShopId": eShopId,
			"productId": productId
		};
		this.getListLast(conditions, callback);
	}

	getListLastByCustomerId(eShopId: number, customerId: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		var conditions = {
			"eShopId": eShopId,
			"customerId": customerId
		};
		this.getListLast(conditions, callback);
	}

	getListLastByChannelId(eShopId: number, channelId: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		var conditions = {
			"eShopId": eShopId,
			"channelId": channelId
		};
		this.getListLast(conditions, callback);
	}

	getListLastByCategoryId(eShopId: number, categoryId: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		var conditions = {
			"eShopId": eShopId,
			"categoryId": categoryId
		};
		this.getListLast(conditions, callback);
	}

	getListLastBySectionAndEntityId(eShopId: number, section: SectionEnum, entityId: number, limit: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		var conditions: any = {
			"eShopId": eShopId,
			"section": SectionEnum[section]
		};
		switch (true) {
			case SectionFactory.isProduct(section):
				conditions.productId = entityId;
				break;
			case SectionFactory.isCustomer(section):
				conditions.customerId = entityId;
				break;
			case SectionFactory.isChannel(section):
				conditions.channelId = entityId;
				break;
			case SectionFactory.isCategory(section):
				conditions.categoryId = entityId;
				break;
			default:
				callback(new Error('Not supported section '+section));
		}
		this.getListLastLimited(conditions, limit, callback);
	}

	private getListLastLimited(conditions: any, limit: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		this.model.find(conditions).limit(limit).sort('-dateValid').exec((e, objects: any[]) => {
			if (e) {
				callback(e);
				return;
			}
			var matrixList = new List<Matrix>(objects, Matrix.fromObject);
			callback(null, matrixList);
		});
	}

	private getListLast(conditions: any, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		this.model.findOne(conditions, null, { sortBy: "-dateValid" }).limit(1).exec((e, maxMatrix: any) => {
			if (e) {
				callback(e);
				return;
			}
			if (!maxMatrix) {
				callback(null, new List<Matrix>());
				return;
			}
			conditions.loadId = maxMatrix.loadId;
			this.model.find(conditions, (e, objects: any[]) => {
				if (e) {
					callback(e);
					return;
				}
				var matrixList = new List<Matrix>(objects, Matrix.fromObject);
				callback(null, matrixList);
			});
		});
	}

	getListLastSortedByChange(eShopId: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		this.model.findOne({ "eShopId": eShopId }, null, { sortBy: "-loadId" }, (e, maxMatrix: any) => {
			if (e) {
				callback(e);
				return;
			}
			if (!maxMatrix) {
				callback(null, new List<Matrix>());
				return;
			}
			var maxLoadId = maxMatrix.loadId;
			this.model.find({ "eShopId": eShopId, "loadId": maxLoadId }, (e, objects: any[]) => {
				if (e) {
					callback(e);
					return;
				}
				var matrixList = new List<Matrix>(objects, Matrix.fromObject);
				callback(null, matrixList);
			});
		});
	}

	getMaxDateValid(callback: (e: Error, maxDateValid?: Date) => void) {
		this.model.findOne({}).sort({ 'dateValid': -1 }).exec((e, object: any) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, object.dateValid);
		});
	}
}
