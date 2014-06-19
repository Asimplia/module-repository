
var sql = require('node-sqlserver');

/** @depreceted */
export function connect(dsn: string) {
	connectMongoDB(dsn);
}
export function connectMongoDB(dsn: string) {
	require('mongoose').connect(dsn);
}
export function connectMSSQL(connectionString: string) {
	sql.open(connectionString, (e, connection) => {
		if (e) {
			throw e;
		}
		console.log('connected MSSQL');
		mssqlConnection = connection;
	});
}
export var mssqlConnection;
export import Suggestion = require('./Suggestion/index');
export import Factor = require('./Factor/index');
export import Entity = require('./Entity/index');
export import Matrix = require('./Matrix/index');
