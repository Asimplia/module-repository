
import mongoose = require('mongoose');
import AbstractRecorder = require('../AbstractRecorder');
import MatrixLoad = require('../Entity/Application/MatrixLoad');
import List = require('../Entity/List');
import MatrixLoadModel = require('../Definition/Application/MatrixLoadModel');

export = MatrixLoadRecorder;
class MatrixLoadRecorder extends AbstractRecorder {
	
	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.model = MatrixLoadModel;
	}

	insertOrUpdateList(matrixLoadList: List<MatrixLoad>, callback: (e: Error, matrixLoadList?: List<MatrixLoad>) => void) {
		matrixLoadList.createEach().on('item', (matrixLoad: MatrixLoad, next) => {
			this.insertOrUpdate(matrixLoad, next);
		})
		.on('error', (e: Error) => {
			callback(e);
		})
		.on('end', () => {
			callback(null, matrixLoadList);
		});
	}

	insertOrUpdate(matrixLoad: MatrixLoad, callback: (e: Error, matrixLoad?: MatrixLoad) => void) {
		this.model.findOne({ id: matrixLoad.Id, eShopId: matrixLoad.EShopId }, (e, doc: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!doc) {
				doc = new this.model({});
				this.getNextId(this.model, (id) => {
					matrixLoad.Id = id;
					this.update(doc, MatrixLoad.fromObject, matrixLoad, callback);
				});
				return;
			}
			this.update(doc, MatrixLoad.fromObject, matrixLoad, callback);
		});
	}
}
