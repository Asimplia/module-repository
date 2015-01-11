
import mongoose = require('mongoose');
import Repository = require('../src/index');

export = integrationPreparer;

class IntegrationPreparer {

	private connecting = false;
	private connected = false;

	startup(done: Function) {
		if (this.connecting || this.connected) {
			done();
			return;
		}
		this.connecting = true;
		Repository.connectMongoDB('mongodb://localhost:27017/farfalia_test', () => {
			this.connected = true;
			done();
		});
	}

	setup(beforeEach: Function, afterEach: Function) {
		beforeEach((done) => {
			mongoose.connection.db.executeDbCommand({ dropDatabase: 1 }, (e, res) => {
				if (e) {
					console.error(e);
					process.exit(1);
					return;
				}
				console.log('MongoDB dropped');
				done();
			});
		});
		afterEach(() => {
			
		});
	}
	
}

var integrationPreparer = new IntegrationPreparer();
