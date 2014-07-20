
import IEntity = require('../IEntity');
import List = require('../List');
import Signal = require('./Signal');

export = Situation;
class Situation implements IEntity {

	get Id() { return this.id; }
	get SignalList() { return this.signalList; }

	constructor(
		private id,
		private signalList: List<Signal>
	) {	}

	toObject() {
		return {
			id: this.id,
			signals: this.signalList.toArray(Signal.toObject)
		};
	}
}
