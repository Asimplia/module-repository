
import moment = require('moment');
import AsimpliaRepository = require('../index');
import Signal = require('../Entity/Matrix/Signal');
import List = require('../Entity/List');

export = SignalRecorder;
class SignalRecorder {

	private connection;

	constructor() {
		AsimpliaRepository.getConnection((connection) => {
			this.connection = connection;
		});
	}

	insertList(signalList: List<Signal>, callback: (e: Error, signalList?: List<Signal>) => void): void {
		signalList.createEach().on('item', (signal: Signal, i: number, next: (e?: Error) => void) => {
			this.connection.query('INSERT INTO analytical.signal (matrixid, datecreated) VALUES ($1, $2::timestamp) RETURNING signalid', [
				signal.Record.Id, moment(signal.DateCreated).format('YYYY-MM-DD HH:mm:ss')
			], (e, res) => {
				if (e) {
					console.log(e);
					return next(e);
				}
				console.log(res);
				signal.Id = res.id;
				next();
			});
		}).on('error', (e: Error) => {
			callback(e);
		}).on('end', () => {
			callback(null, signalList);
		}).parallel(10);
	}

}