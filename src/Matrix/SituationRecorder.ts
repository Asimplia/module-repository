
import Situation = require('../Entity/Matrix/Situation');
import ISituationObject = require('../Entity/Matrix/ISituationObject');
import Util = require('asimplia-util');
import List = Util.ODBM.Entity.List;
import Manager = Util.ODBM.Repository.PostgreSql.Manager;
import DateFactory = Util.DateTime.DateFactory;
/* tslint:disable */
Util;
/* tslint:enable */

export = SituationRecorder;
class SituationRecorder {

	static $inject = [
		'connection.postgres',
		DateFactory,
	];
	constructor(
		private connection: any,
		private dateFactory: DateFactory,
		private manager: Manager<Situation, ISituationObject, List<Situation>>
			= new Manager<Situation, ISituationObject, List<Situation>>(Situation, List, connection)
	) {}

	insert(situation: Situation, callback: (e: Error, situation?: Situation) => void) {
		this.manager.insert(situation, callback);
	}

	setSuggestionResultProcessed(situation: Situation, created: boolean, callback: (e: Error, situation?: Situation) => void) {
		situation.DateSuggestionResultProcessed = this.dateFactory.now();
		if (created) {
			situation.DateSuggestionResultCreated = this.dateFactory.now();
		}
		this.update(situation, callback);
	}

	setChecklistProcessed(situation: Situation, created: boolean, callback: (e: Error, situation?: Situation) => void) {
		situation.DateChecklistProcessed = this.dateFactory.now();
		if (created) {
			situation.DateChecklistCreated = this.dateFactory.now();
		}
		this.update(situation, callback);
	}

	update(situation: Situation, callback: (e: Error, situation?: Situation) => void) {
		this.manager.update(situation, callback);
	}

	removeByIds(ids: number[], callback: (e: Error) => void) {
		this.manager.removeBy({
			id: { $in: ids }
		}, callback);
	}
}
