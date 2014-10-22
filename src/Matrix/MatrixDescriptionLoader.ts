
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import mongoose = require('mongoose');
import List = require('../Entity/List');
import MatrixDescription = require('../Entity/Matrix/MatrixDescription');
import MatrixDescriptionModel = require('../Definition/Matrix/MatrixDescriptionModel');

export = MatrixDescriptionLoader;
class MatrixDescriptionLoader {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		this.model = MatrixDescriptionModel;
	}

	getList(callback: (e: Error, list?: List<MatrixDescription>) => void) {
		this.model.find({}, (e, docs: any[]) => {
			if (e) {
				return callback(e);
			}
			var list = new List<MatrixDescription>(docs, MatrixDescription.fromObject);
			callback(null, list);
		});
	}
	
}
