
import mongoose = require('mongoose');
import Repository = require('../src/index');
import ConnectionDispatcher = Repository.ConnectionDispatcher;

export = IntegrationPreparer;
class IntegrationPreparer {

	private connecting = false;
	private connected = false;

	static $inject = [
		'ConnectionDispatcher'
	];
	constructor(
		private connectionDispatcher: ConnectionDispatcher
	) {}

	startup(done: Function) {
		if (this.connecting || this.connected) {
			done();
			return;
		}
		this.connecting = true;
		try {
			this.connectionDispatcher.connectMongoDB('mongodb://localhost:27017/farfalia_test', () => {
				this.connected = true;
				done();
			});
		} catch (e) {
			if (e.state === 1) {
				this.connected = true;
			} else {
				throw e;
			}
		}
	}

	setup(done: Function) {
		mongoose.connection.db.executeDbCommand({ dropDatabase: 1 }, (e, res) => {
			if (e) {
				console.error(e);
				process.exit(1);
				return;
			}
			console.log('MongoDB dropped');
			done();
		});
	}
}
