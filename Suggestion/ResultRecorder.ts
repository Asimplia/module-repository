/// <reference path="../typings/mongoose/mongoose.d.ts" />

import AbstractRecorder = require('../AbstractRecorder');
import Result = require('../Entity/Suggestion/Result');
import List = require('../Entity/List');
import mongoose = require('mongoose');
import ResultModel = require('./ResultModel');

export = ResultRecorder;
class ResultRecorder extends AbstractRecorder {

	private ResultModel: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.ResultModel = ResultModel;
	}

	insertOrUpdate(result: Result, callback: (e: Error, result?: Result) => void): void {
		this.ResultModel.findOne({ id: result.Id }, (e, resultDocument: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!resultDocument) {
				resultDocument = new this.ResultModel({});
				this.getNextId(this.ResultModel, (id) => {
					result.Id = id;
					this.update(resultDocument, Result.fromObject, result, callback);
				});
				return;
			}
			this.update(resultDocument, Result.fromObject, result, callback);
		});
	}

	removeBySituationIds(situationIds: number[], callback: (e: Error) => void) {
		var conditions: any = {};
		conditions.situationId = { $in: situationIds };
		this.ResultModel.remove(conditions).exec((e: Error) => {
			callback(e);
		});
	}
}
