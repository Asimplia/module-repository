
import mongoose = require('mongoose');
import Matrix = require('../Entity/Application/Matrix');
import List = require('../Entity/List');
import MatrixModel = require('../Definition/Application/MatrixModel');
import DocumentExecutor = require('../Util/DocumentExecutor');
import IMatrixDocument = require('../Definition/Application/IMatrixDocument');

export = MatrixRecorder;
class MatrixRecorder {
	
	private model: mongoose.Model<IMatrixDocument>;
	private documentExecutor: DocumentExecutor;

	constructor() {
		this.model = MatrixModel;
		this.documentExecutor = new DocumentExecutor(this.model, Matrix);
	}

	insertOrUpdateList(matrixList: List<Matrix>, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		this.documentExecutor.insertOrUpdateList(matrixList, callback);
	}

	insertOrUpdate(matrix: Matrix, callback: (e: Error, matrix?: Matrix) => void) {
		this.model.findOne({ id: matrix.Id }, (e, matrixDocument: mongoose.Document) => {
			this.documentExecutor.insertOrUpdate(matrix, callback);
		});
	}
}
