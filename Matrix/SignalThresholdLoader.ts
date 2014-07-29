
import SignalThreshold = require('../Entity/Matrix/SignalThreshold');
import List = require('../Entity/List');
import SectionEnum = require('../Entity/Section/SectionEnum');
import mongoose = require('mongoose');

export = SignalThresholdLoader;
class SignalThresholdLoader {

	private SignalThresholdModel: mongoose.Model<mongoose.Document>;

	constructor() {
		this.SignalThresholdModel = require('./SignalThresholdModel');
	}

	getByMatrixType(section: SectionEnum, callback: (e: Error, signalThreshold?: SignalThreshold) => void): void {
		this.SignalThresholdModel.findOne({ section: SectionEnum[section] }, (e: Error, signalThresholdObject?: any) => {
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
}
