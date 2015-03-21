
import mongoose = require('mongoose');
import Matrix = require('../Entity/Application/Matrix');
import List = require('../Entity/List');
import SectionEnum = require('../Entity/Section/SectionEnum');
import SectionFactory = require('../Entity/Section/SectionFactory');
import DocumentExecutor = require('../Util/DocumentExecutor');
import IMatrixDocument = require('../Definition/Application/IMatrixDocument');

export = MatrixLoader;
class MatrixLoader {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Application.MatrixModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, Matrix);
	}

	getListLastByProductId(eShopId: number, productId: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		var conditions = {
			eShopId: eShopId,
			productId: productId
		};
		this.getListLast(conditions, callback);
	}

	getListLastByCustomerId(eShopId: number, customerId: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		var conditions = {
			eShopId: eShopId,
			customerId: customerId
		};
		this.getListLast(conditions, callback);
	}

	getListLastByChannelId(eShopId: number, channelId: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		var conditions = {
			eShopId: eShopId,
			channelId: channelId
		};
		this.getListLast(conditions, callback);
	}

	getListLastByCategoryId(eShopId: number, categoryId: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		var conditions = {
			eShopId: eShopId,
			categoryId: categoryId
		};
		this.getListLast(conditions, callback);
	}

	getListLastBySectionAndEntityId(
		eShopId: number,
		section: SectionEnum,
		entityId: number,
		limit: number,
		callback: (e: Error, matrixList?: List<Matrix>) => void
	) {
		var conditions: any = {
			eShopId: eShopId,
			section: SectionEnum[section]
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
				callback(new Error('Not supported section ' + section));
		}
		this.getListLastLimited(conditions, limit, callback);
	}

	private getListLastLimited(conditions: any, limit: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		this.model.find(conditions).limit(limit).sort('-dateValid').exec((e: Error, objects: IMatrixDocument[]) => {
			this.documentExecutor.createListByObjects(e, objects, callback);
		});
	}

	private getListLast(conditions: any, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		this.model.findOne(conditions, null, { sortBy: '-dateValid' }).limit(1).exec((e: Error, maxMatrix: IMatrixDocument) => {
			if (e) {
				callback(e);
				return;
			}
			if (!maxMatrix) {
				callback(null, new List<Matrix>());
				return;
			}
			conditions.loadId = maxMatrix.loadId;
			this.model.find(conditions, (e: Error, objects: IMatrixDocument[]) => {
				this.documentExecutor.createListByObjects(e, objects, callback);
			});
		});
	}

	getListLastSortedByChange(eShopId: number, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		this.model.findOne({ eShopId: eShopId }, null, { sortBy: '-loadId' }, (e: Error, maxMatrix: IMatrixDocument) => {
			if (e) {
				callback(e);
				return;
			}
			if (!maxMatrix) {
				callback(null, new List<Matrix>());
				return;
			}
			var maxLoadId = maxMatrix.loadId;
			this.model.find({ eShopId: eShopId, loadId: maxLoadId }, (e: Error, objects: IMatrixDocument[]) => {
				this.documentExecutor.createListByObjects(e, objects, callback);
			});
		});
	}

	getMaxDateValid(callback: (e: Error, maxDateValid?: Date) => void) {
		this.model.findOne({}).sort({ 'dateValid': -1 }).exec((e: Error, object: any) => {
			this.documentExecutor.createDateValue(e, object, callback, 'dateValid');
		});
	}
}
