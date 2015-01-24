
import mongoose = require('mongoose');
import MatrixLoad = require('../Entity/Application/MatrixLoad');
import List = require('../Entity/List');
import MatrixLoadModel = require('../Definition/Application/MatrixLoadModel');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = MatrixLoadRecorder;
class MatrixLoadRecorder {
	
	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Application.MatrixLoadModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, MatrixLoad);
	}

	insertOrUpdateList(matrixLoadList: List<MatrixLoad>, callback: (e: Error, matrixLoadList?: List<MatrixLoad>) => void) {
		this.documentExecutor.insertOrUpdateList(matrixLoadList, callback);
	}

	insertOrUpdate(matrixLoad: MatrixLoad, callback: (e: Error, matrixLoad?: MatrixLoad) => void) {
		this.documentExecutor.insertOrUpdate(matrixLoad, callback);
	}
}
