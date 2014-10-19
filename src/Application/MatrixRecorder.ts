
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import AbstractRecorder = require('../AbstractRecorder');
import Matrix = require('../Entity/Application/Matrix');
import List = require('../Entity/List');
import MatrixModel = require('../Definition/Application/MatrixModel');

export = MatrixRecorder;
class MatrixRecorder extends AbstractRecorder {
	
	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.model = MatrixModel;
	}

	insertOrUpdateList(matrixList: List<Matrix>, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		matrixList.createEach().on('item', (matrix: Matrix, next) => {
			this.insertOrUpdate(matrix, next);
		})
		.on('error', (e: Error) => {
			callback(e);
		})
		.on('end', () => {
			callback(null, matrixList);
		});
	}

	insertOrUpdate(matrix: Matrix, callback: (e: Error, matrix?: Matrix) => void) {
		this.model.findOne({ id: matrix.Id }, (e, matrixDocument: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!matrixDocument) {
				matrixDocument = new this.model({});
				this.getNextId(this.model, (id) => {
					matrix.Id = id;
					this.update(matrixDocument, Matrix.fromObject, matrix, callback);
				});
				return;
			}
			this.update(matrixDocument, Matrix.fromObject, matrix, callback);
		});
	}
}
