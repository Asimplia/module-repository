
import mongoose = require('mongoose');

export = MongoReconnector;
class MongoReconnector {
	
	static $aspect = 'Connection.MongoReconnector';
	static $service = 'Connection.MongoReconnector';
	static $args = [100, 5000];
	static $inject = [
		'connection.mongoose'
	];
	constructor(
		private handleReconnectionAfter: number,
		private reconnectAfter: number,
		private db: mongoose.Mongoose
	) {}

	intercept() {
		this.db.connection.on('error', (e: Error) => {
			console.error(e);
		});
		this.db.connection.on('disconnected', () => {
			console.warn('MongoDB was disconnected');
			setTimeout(() => this.handleAutoReconnection(), this.handleReconnectionAfter);
		});
	}

	private handleAutoReconnection() {
		this.db.connection.db.getCollectionNames((e: Error, names: string[]) => {
			if (e) {
				console.info('MongoDB will be reconnected in ' + this.reconnectAfter + 'ms');
				return setTimeout(() => this.reconnect(), this.reconnectAfter);
			}
			console.info('During handling MongoDB auto-reconnection the connection is successful');
		});
	}

	private reconnect() {
		this.db.connection.db.getCollectionNames((e: Error, names: string[]) => {
			if (e) {
				console.info('MongoDB reconnecting...');
				this.db.connect(this.buildDsn(), (e: Error) => {
					if (e) {
						console.error('...MongoDB reconnecting failed');
						return this.handleAutoReconnection();
					}
					console.info('...MongoDB reconnected');
				});
			} else {
				console.info('MongoDB reconnected natively');
			}
		});
	}

	private buildDsn() {
		return 'mongodb://' + this.db.connection.db.host 
			+ ':' + this.db.connection.db.port 
			+ '/' + this.db.connection.db.name;
	}
}
