﻿
import SignalThreshold = require('../Entity/Matrix/SignalThreshold');
import List = require('../Entity/List');
import SectionEnum = require('../Entity/Section/SectionEnum');
import mongoose = require('mongoose');
import DocumentExecutor = require('../Util/DocumentExecutor');

export = SignalThresholdLoader;
class SignalThresholdLoader {

	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Matrix.SignalThresholdModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, SignalThreshold);
	}

	getByMatrixType(section: SectionEnum, callback: (e: Error, signalThreshold?: SignalThreshold) => void): void {
		this.model.findOne({ section: SectionEnum[section] }, (e: Error, signalThresholdObject?: any) => {
			if (e) {
				callback(e);
				return;
			}
			if (!signalThresholdObject) {
				callback(null);
				return;
			}
			var signalThreshold = SignalThreshold.fromObject(signalThresholdObject);
			callback(null, signalThreshold);
		});
	}

	getList(callback: (e: Error, signalThresholdList?: List<SignalThreshold>) => void) {
		this.model.find({}, null, { sort: 'section' }, (e: Error, thresholds: mongoose.Document[]) => {
			if (e) {
				return callback(e);
			}
			var list = new List<SignalThreshold>();
			list.pushArray(thresholds, SignalThreshold.fromObject);
			callback(null, list);
		});
	}

	getMaxDateValid(callback: (e: Error, maxDateValid?: Date) => void) {
		this.model.findOne({}).sort({ 'dateValid': -1 }).exec((e: Error, object: any) => {
			if (e) {
				callback(e);
				return;
			}
			if (!object) {
				callback(null, null);
				return;
			}
			callback(null, object.dateValid);
		});
	}
}
