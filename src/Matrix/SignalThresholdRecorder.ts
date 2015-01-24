
import SignalThreshold = require('../Entity/Matrix/SignalThreshold');
import SectionEnum = require('../Entity/Section/SectionEnum');
import mongoose = require('mongoose');
import SignalThresholdModel = require('../Definition/Matrix/SignalThresholdModel');
import DocumentExecutor = require('../Util/DocumentExecutor');
import List = require('../Entity/List');

export = SignalThresholdRecorder;
class SignalThresholdRecorder {
	
	private documentExecutor: DocumentExecutor;

	static $inject = [
		'Definition.Matrix.SignalThresholdModel'
	];
	constructor(
		private model: mongoose.Model<mongoose.Document>
	) {
		this.documentExecutor = new DocumentExecutor(this.model, SignalThreshold);
	}

	insertOrUpdateList(signalThresholdList: List<SignalThreshold>, callback: (e: Error, signalThresholdList?: List<SignalThreshold>) => void) {
		this.documentExecutor.insertOrUpdateList(signalThresholdList, callback);
	}

	insertOrUpdate(signalThreshold: SignalThreshold, callback: (e: Error, signalThreshold?: SignalThreshold) => void) {
		this.documentExecutor.insertOrUpdate(signalThreshold, callback);
	}

	insertList(signalThresholdList: List<SignalThreshold>, callback: (e: Error, signalThresholdList?: List<SignalThreshold>) => void) {
		this.documentExecutor.insertList(signalThresholdList, callback);
	}

	insert(signalThreshold: SignalThreshold, callback: (e: Error, signalThreshold?: SignalThreshold) => void) {
		this.documentExecutor.insert(signalThreshold, callback);
	}

}
