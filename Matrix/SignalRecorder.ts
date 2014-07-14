
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
			this.connection.query('INSERT INTO Signal (MatrixID, DateCreated) VALUES (?, ?)', [
				signal.Record.Id, moment(signal.DateCreated).format('YYYY-MM-DD HH:mm:SS')
			], (e, res) => {
				if (e) {
					console.log(e);
					return next(e);
				}
				this.getLastInsertedId((e: Error, id) => {
					if (e) {
						return next(e);
					}
					signal.Id = id;
					next();
				});
			});
		}).on('error', (e: Error) => {
			callback(e);
		}).on('end', () => {
			callback(null, signalList);
		}).parallel(10);
	}

	getLastInsertedId(callback: (e: Error, id?: number) => void) {
		this.connection.query('SELECT SCOPE_IDENTITY() AS ID', (e: Error, res) => {
			if (e) {
				return callback(e);
			}
			callback(null, res.pop()['ID']);
		});
	}
}