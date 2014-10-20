
/// <reference path="../../typings/mongoose/mongoose.d.ts" />

import AbstractRecorder = require('../AbstractRecorder');
import SignalThreshold = require('../Entity/Matrix/SignalThreshold');
import SectionEnum = require('../Entity/Section/SectionEnum');
import mongoose = require('mongoose');
import SignalThresholdModel = require('../Definition/Matrix/SignalThresholdModel');
import List = require('../Entity/List');

export = SignalThresholdRecorder;
class SignalThresholdRecorder extends AbstractRecorder {

	private model: mongoose.Model<mongoose.Document>;

	constructor() {
		super();
		this.model = SignalThresholdModel;
	}

	insertOrUpdateList(signalThresholdList: List<SignalThreshold>, callback: (e: Error, signalThresholdList?: List<SignalThreshold>) => void) {
		signalThresholdList.createEach().on('item', (signalThreshold: SignalThreshold, next) => {
			this.insertOrUpdate(signalThreshold, next);
		})
		.on('error', (e: Error) => {
			callback(e);
		})
		.on('end', () => {
			callback(null, signalThresholdList);
		});
	}

	insertOrUpdate(threshold: SignalThreshold, callback: (e: Error, threshold?: SignalThreshold) => void): void {
		this.model.findOne({ section: SectionEnum[threshold.Section] }, (e, thresholdDocument: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!thresholdDocument) {
				thresholdDocument = new this.model({});
			}
			this.update(thresholdDocument, SignalThreshold.fromObject, threshold, callback);
		});
	}

	insertList(signalThresholdList: List<SignalThreshold>, callback: (e: Error, signalThresholdList?: List<SignalThreshold>) => void) {
		signalThresholdList.createEach().on('item', (signalThreshold: SignalThreshold, next) => {
			this.insert(signalThreshold, next);
		})
		.on('error', (e: Error) => {
			callback(e);
		})
		.on('end', () => {
			callback(null, signalThresholdList);
		});
	}

	insert(threshold: SignalThreshold, callback: (e: Error, threshold?: SignalThreshold) => void): void {
		this.model.findOne({ section: SectionEnum[threshold.Section] }, (e, thresholdDocument: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (thresholdDocument) {
				callback(null, null);
				return;
			}
			thresholdDocument = new this.model({});
			this.update(thresholdDocument, SignalThreshold.fromObject, threshold, callback);
		});
	}

}
