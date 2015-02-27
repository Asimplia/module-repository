
import Util = require('asimplia-util');
import DependencyInjection = Util.DI.DependencyInjection;
import mongoose = require('mongoose');
import each = require('each');
import pg = require('pg');
var neo4j = require('neo4j');

export = ConnectionDispatcher;
class ConnectionDispatcher {

	private connectionListeners = [];
	private neo4jListeners = [];
	private mongooseConnection: mongoose.Mongoose;
	private pgClient;
	private pgReconnecting = false;
	private neo4jDatabase;

	static $inject = [
		DependencyInjection
	];
	constructor(
		private di: DependencyInjection
	) {
		this.bindTermination();
	}

	connectMongoDB(dsn: string, callback?: (mongoose: mongoose.Mongoose) => void) {
		if (this.mongooseConnection) {
			return console.warn('MongoDB was already connected');
		}
		this.mongooseConnection = mongoose.connect(dsn, (e: Error) => {
			if (e) throw e;
			this.di.addService('connection.mongoose', this.mongooseConnection);
			console.info('Connected MongoDB to ' + dsn);
			if (typeof callback === 'function') {
				callback(this.mongooseConnection);
			}
			this.bindMongoDBLogging();
		});
	}

	private bindMongoDBLogging() {
		this.mongooseConnection.connection.on('connected', () => {
			console.info('MongoDB connected');
		});
		this.mongooseConnection.connection.on('disconnected', () => {
			console.warn('MongoDB disconnected');
		});
		this.mongooseConnection.connection.on('error', (e: Error) => {
			console.error('MongoDB throws error', e);
		});
	}

	connectPostgres(connectionString: string, callback?: (client: pg.Client) => void) {
		if (this.pgClient) {
			return console.warn('Postgres was already connected');
		}
		var client = new pg.Client(connectionString);
		client.once('connect', () => {
			this.pgClient = client;
			this.di.addService('connection.postgres', this.pgClient);
			console.info('Connected Postgres to ' + connectionString);
			this.connectionListeners.forEach((callback) => {
				callback(this.pgClient);
			});
			if (typeof callback === 'function') {
				callback(this.pgClient);
			}
		});
		this.bindPostgresAutoReconnecting(client);
		client.connect();
	}

	private bindPostgresAutoReconnecting(client: pg.Client) {
		client.on('error', (e: Error) => {console.log((<any>client).connection.stream.readyState);
			console.error('Postgres throws error', e);
			this.handleReconnectPostgres(client);
		});
	}

	private handleReconnectPostgres(client: pg.Client) {
		this.pgReconnecting = true;
		console.info('Postgres reconnecting...');
		this.reconnectPostgres(client, (e: Error) => {
			if (e) {
				console.error('...Postgres reconnection failed. Try again in 5s');
				setTimeout(() => {
					this.handleReconnectPostgres(client);
				}, 5000);
			} else {
				console.info('...Postgres reconnected sucessfuly');
				this.pgReconnecting = false;
			}
		});
	}

	private reconnectPostgres(client: pg.Client, callback: (e: Error) => void) {
		client.once('connect', () => {
			callback(null);
		});
		client.connect();
	}

	connectNeo4j(dsn: string, callback?: (db: any) => void) {
		var db = new neo4j.GraphDatabase(dsn);
		db.query('RETURN 1;', {}, (e: Error, res: any) => {
			if (e) throw e;
			this.di.addService('connection.neo4j', this.neo4jDatabase);
			console.info('Connected Neo4j to ' + dsn);
			this.neo4jDatabase = db;
			this.neo4jListeners.forEach((callback) => {
				callback(this.neo4jDatabase);
			});
			if (typeof callback === 'function') {
				callback(this.neo4jDatabase);
			}
		});
	}

	private bindTermination() {
		process.on('SIGINT', () => this.handleTermination());
		process.on('SIGTERM', () => this.handleTermination());
	}

	private handleTermination() {
		each([
			(next: Function) => this.disconnectMongoDB(next),
			(next: Function) => this.disconnectPostgres(next),
		])
		.on('item', (fn: (cb: Function) => void, next: Function) => fn(next))
		.on('error', (e: Error) => console.error(e))
		.on('end', () => {
			console.info('Termination handled & exiting');
			process.exit(0);
		})
		.parallel(true);
	}

	private disconnectMongoDB(next: Function) {
		if (this.mongooseConnection) {
			this.mongooseConnection.connection.close(() => {
				console.info('MongoDB connection disconnected through app termination');
				next();
			});
		} else {
			next();
		}
	}

	private disconnectPostgres(next: Function) {
		if (this.pgClient) {
			this.pgClient.end();
			console.info('Postgres connection disconnected through app termination');
		}
		next();
	}

	/** @deprecated Use DI $inject */
	getConnection(callback: (connection: pg.Client) => void) {
		this.connectionListeners.push(callback);
		if (this.pgClient) {
			callback(this.pgClient);
		}
	}

	/** @deprecated Use DI $inject */
	getGraphDatabase(callback: (db: any) => void) {
		this.neo4jListeners.push(callback);
		if (this.neo4jDatabase) {
			callback(this.neo4jDatabase);
		}
	}

	/** @deprecated Use DI $inject */
	getMongooseConnection(callback: (mongoose: mongoose.Mongoose) => void) {
		callback(this.mongooseConnection);
	}
}
