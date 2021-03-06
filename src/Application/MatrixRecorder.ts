
import mongoose = require('mongoose');
import Matrix = require('../Entity/Application/Matrix');
import List = require('../Entity/List');
import DocumentExecutor = require('../Util/DocumentExecutor');
import IMatrixDocument = require('../Definition/Application/IMatrixDocument');

export = MatrixRecorder;
class MatrixRecorder {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Application.MatrixModel'
	];
	constructor(
		private model: mongoose.Model<IMatrixDocument>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, Matrix);
	}

	insertOrUpdateList(matrixList: List<Matrix>, callback: (e: Error, matrixList?: List<Matrix>) => void) {
		this.documentExecutor.insertOrUpdateList(matrixList, callback);
	}

	insertOrUpdate(matrix: Matrix, callback: (e: Error, matrix?: Matrix) => void) {
		this.model.findOne({ id: matrix.Id }, (e: Error, matrixDocument: IMatrixDocument) => {
			this.documentExecutor.insertOrUpdate(matrix, callback);
		});
	}
}
