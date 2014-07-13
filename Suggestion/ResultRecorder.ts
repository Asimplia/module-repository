﻿/// <reference path="../typings/mongoose/mongoose.d.ts" />

import AbstractRecorder = require('../AbstractRecorder');
import Result = require('../Entity/Suggestion/Result');
import List = require('../Entity/List');
import mongoose = require('mongoose');

export = ActionRecorder;
class ActionRecorder extends AbstractRecorder {

	private ResultModel: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.ResultModel = require('./ResultModel');
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
				})
				return;
			}
			this.update(resultDocument, Result.fromObject, result, callback);
		});
	}
}
