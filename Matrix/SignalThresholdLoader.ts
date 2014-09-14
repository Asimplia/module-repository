
import SignalThreshold = require('../Entity/Matrix/SignalThreshold');
import List = require('../Entity/List');
import SectionEnum = require('../Entity/Section/SectionEnum');
import mongoose = require('mongoose');
import SignalThresholdModel = require('./SignalThresholdModel');

export = SignalThresholdLoader;
class SignalThresholdLoader {

	private SignalThresholdModel: mongoose.Model<mongoose.Document>;

	constructor() {
		this.SignalThresholdModel = SignalThresholdModel;
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

	getList(callback: (e: Error, signalThresholdList?: List<SignalThreshold>) => void) {
		this.SignalThresholdModel.find({}, null, { sort: 'section' }, (e, thresholds: mongoose.Document[]) => {
			if (e) {
				return callback(e);
			}
			var list = new List<SignalThreshold>();
			list.pushArray(thresholds, SignalThreshold.fromObject);
			callback(null, list);
		});
	}
}
