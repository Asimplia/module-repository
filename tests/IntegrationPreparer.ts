
import Repository = require('../src/index');
import ConnectionDispatcher = Repository.ConnectionDispatcher;
import fs = require('fs');
import each = require('each');
/* tslint:disable */
Repository;
/* tslint:enable */

export = IntegrationPreparer;
class IntegrationPreparer {

	private connecting = false;
	private connected = false;
	private mongoose: any;
	private pgClient: any;

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
			var mongoDsn = process.env.MONGODB_DSN_TEST || 'mongodb://localhost:27017/farfalia_test';
			var postgreDsn = process.env.POSTGRES_DSN_TEST || 'postgres://postgres@localhost:5432/farfalia_test';
			this.connectionDispatcher.connectMongoDB(mongoDsn, (mongoose: any) => { // TODO set dsn as contructor arg
				this.mongoose = mongoose;
				this.connectionDispatcher.connectPostgres(postgreDsn, (client: any) => { // TODO set dsn as contructor arg
					this.pgClient = client;
					this.connected = true;
					done();
				});
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
		this.mongoose.connection.db.executeDbCommand({ dropDatabase: 1 }, (e: Error, res: any) => {
			if (e) {
				console.error(e);
				process.exit(1);
				return;
			}
			console.log('MongoDB dropped');
			this.processSQLFile(this.pgClient, __dirname + '/../../sql/create/00-schemas.sql', () => {
				console.log('PostgreSQL dropped');
				done();
			});
		});
	}

	private processSQLFile(client: any, fileName: string, next: (e: Error) => void) {
		// Extract SQL queries from files. Assumes no ';' in the fileNames
		var queries = fs.readFileSync(fileName).toString()
		.replace(/(\r\n|\n|\r)/gm, ' ') // remove newlines
		.replace(/\s+/g, ' ') // excess white space
		.split(';') // split into all statements
		.map(Function.prototype.call, String.prototype.trim)
		.filter((el: any) => { return el.length != 0; }); // remove any empty ones

		// Execute each SQL query sequentially
		var executions = [];
		queries.forEach((query: string) => {
			executions.push((done: Function) => {
				client.query(query, (result: any) => {
					done();
				});
			});
		});
		each(executions)
		.on('item', (execution: (done: Function) => void, done: (e: Error) => void) => execution(done))
		.on('error', (e: Error) => next(e))
		.on('end', () => next(null));
	}
}
