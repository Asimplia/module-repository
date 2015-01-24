
import Factor = require('../Entity/Factor/Factor');
import List = require('../Entity/List');
import mongoose = require('mongoose');
import FactorModel = require('../Definition/Factor/FactorModel');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = FactorLoader;
class FactorLoader {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Factor.FactorModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, Factor);
	}

	getList(callback: (e: Error, factorList?: List<Factor>) => void) {
		this.model.find({}, null, { sort: 'id' }, (e, factors: mongoose.Document[]) => {
			if (e) {
				return callback(e);
			}
			var list = new List<Factor>();
			list.pushArray(factors, Factor.fromObject);
			callback(null, list);
		});
	}
}
