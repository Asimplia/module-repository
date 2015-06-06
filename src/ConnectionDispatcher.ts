
import Util = require('asimplia-util');
import DependencyInjection = Util.DI.DependencyInjection;
import mongoose = require('mongoose');
import each = require('each');
import Q = require('q');
/* tslint:disable */
var pg = require('pg');
var neo4j = require('neo4j');
Util;
/* tslint:enable */

export = ConnectionDispatcher;
class ConnectionDispatcher {

	private connectionListeners = [];
	private neo4jListeners = [];
	private mongooseConnection: mongoose.Mongoose;
	private pgClient;
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
		this.mongooseConnection = mongoose.connect(dsn, (e: Error) => {
			if (e) {
				throw e;
			}
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
			console.error('MongoDB throw error', e);
		});
	}

	connectPostgres(connectionString: string, callback?: (client: any) => void) {
		var client = new pg.Client(connectionString);
		client.connect((e: Error) => {
			if (e) {
				throw e;
			}
			this.pgClient = client;
			this.di.addService('connection.postgres', this.createPostgresService(this.pgClient));
			console.info('Connected Postgres to ' + connectionString);
			this.connectionListeners.forEach((callback: (client: any) => void) => {
				callback(this.pgClient);
			});
			if (typeof callback === 'function') {
				callback(this.pgClient);
			}
			this.keepAlivePostgresConnection();
		});
	}

	private keepAlivePostgresConnection() {
		setInterval(() => {
			this.pgClient.query('SELECT 1;', (e: Error) => {
				if (e) {
					console.error('Error happened during keep alive Postgres connection', e);
				}
			});
		}, 3000);
	}

	connectNeo4j(dsn: string, callback?: (db: any) => void) {
		var db = new neo4j.GraphDatabase(dsn);
		db.query('RETURN 1;', {}, (e: Error, res: any) => {
			if (e) {
				throw e;
			}
			this.neo4jDatabase = db;
			this.di.addService('connection.neo4j', this.neo4jDatabase);
			console.info('Connected Neo4j to ' + dsn);
			this.neo4jListeners.forEach((callback: (database: any) => void) => {
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
	getConnection(callback: (connection: any) => void) {
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

	private createPostgresService(pgClient: any) {
		var service: any = function () {
			var deferred = Q.defer();
			pg.pools.getOrCreate().acquire((e: Error, pgClient: any) => {
				if (e) return deferred.reject(e);
				deferred.resolve(pgClient);
			});
			return deferred.promise;
		};
		service.query = (...args: any[]) => pgClient.query.apply(pgClient, args);
		service.on = (...args: any[]) => pgClient.on.apply(pgClient, args);
		service.removeListener = (...args: any[]) => pgClient.removeListener.apply(pgClient, args);
		return service;
	}
}
