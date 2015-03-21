
import Factor = require('../Entity/Factor/Factor');
import mongoose = require('mongoose');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = FactorRecorder;
class FactorRecorder {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Factor.FactorModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, Factor);
	}

	insertOrUpdate(factor: Factor, callback: (e: Error, factor?: Factor) => void) {
		this.documentExecutor.insertOrUpdate(factor, callback);
	}

	remove(id: number, callback: (e: Error) => void): void {
		this.model.findOneAndRemove({ id: id }, (e: Error) => {
			callback(e);
		});
	}

}
