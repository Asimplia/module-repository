
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import AbstractRecorder = require('../AbstractRecorder');
import SignalThreshold = require('../Entity/Matrix/SignalThreshold');
import SectionEnum = require('../Entity/Section/SectionEnum');
import mongoose = require('mongoose');
import SignalThresholdModel = require('./SignalThresholdModel');

export = SignalThresholdRecorder;
class SignalThresholdRecorder extends AbstractRecorder {

	private SignalThresholdModel: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.SignalThresholdModel = SignalThresholdModel;
	}

	insertOrUpdate(threshold: SignalThreshold, callback: (e: Error, threshold?: SignalThreshold) => void): void {
		this.SignalThresholdModel.findOne({ section: SectionEnum[threshold.Section] }, (e, thresholdDocument: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!thresholdDocument) {
				thresholdDocument = new this.SignalThresholdModel({});
			}
			this.update(thresholdDocument, SignalThreshold.fromObject, threshold, callback);
		});
	}

}
