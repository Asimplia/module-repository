
import mongoose = require('mongoose');
import List = require('../Entity/List');
import MatrixDescription = require('../Entity/Matrix/MatrixDescription');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = MatrixDescriptionLoader;
class MatrixDescriptionLoader {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Matrix.MatrixDescriptionModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, MatrixDescription);
	}

	getList(callback: (e: Error, list?: List<MatrixDescription>) => void) {
		this.model.find({}, (e: Error, docs: any[]) => {
			if (e) {
				return callback(e);
			}
			var list = new List<MatrixDescription>(docs, MatrixDescription.fromObject);
			callback(null, list);
		});
	}
}
