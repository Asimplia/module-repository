
import AbstractRecorder = require('../AbstractRecorder');
import Factor = require('../Entity/Factor/Factor');
import List = require('../Entity/List');
import mongoose = require('mongoose');

export = FactorRecorder;
class FactorRecorder extends AbstractRecorder {

	private FactorModel: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.FactorModel = require('./FactorModel');
	}

	insertOrUpdate(factor: Factor, callback: (e: Error, action?: Factor) => void): void {
		this.FactorModel.findOne({ id: factor.Id }, (e, factorDocument: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!factorDocument) {
				factorDocument = new this.FactorModel({});
				this.getNextId(this.FactorModel, (id) => {
					factor.Id = id;
					this.update(factorDocument, Factor.fromObject, factor, callback);
				})
				return;
			}
			this.update(factorDocument, Factor.fromObject, factor, callback);
		});
	}

	remove(id: number, callback: (e: Error) => void): void {
		this.FactorModel.findOneAndRemove({ id: id }, (e: Error) => {
			callback(e);
		});
	}

}
