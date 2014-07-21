
import Situation = require('../Entity/Matrix/Situation');
import moment = require('moment');
import Repository = require('../index');
import List = require('../Entity/List');

export = SituationRecorder;
class SituationRecorder {

	private connection;

	constructor() {
		Repository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	insert(situation: Situation, callback: (e: Error, situation?: Situation) => void) {
		this.connection.query('INSERT INTO analytical.'+Situation.TABLE_NAME+' ('+Situation.COLUMN_DATE_CREATED+')'
			+' VALUES ($1::timestamp) RETURNING '+Situation.COLUMN_SITUATION_ID, [
			moment(situation.DateCreated).format('YYYY-MM-DD HH:mm:ss')
		], (e, res) => {
			if (e) {
				console.log(e);
				callback(e);
				return;
			}
			situation.Id = res.rows[0][Situation.COLUMN_SITUATION_ID];
			callback(null, situation);
		});
	}
}
