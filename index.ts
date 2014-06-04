
import AsimpliaUtil = require('asimplia-util');
var mssql = require('mssql');

/** @depreceted */
export function connect(dsn: string) {
	connectMongoDB(dsn);
}
export function connectMongoDB(dsn: string) {
	require('mongoose').connect(dsn);
}
export function connectMSSQL(connectionString: string) {
	var config = AsimpliaUtil.SQLServer.parseConnectionString(connectionString);
	mssqlConnection = new mssql.Connection(config);
	mssqlConnection.connect((e) => {
		if (e) {
			throw e;
		}
	});
}
export var mssqlConnection;
export import Suggestion = require('./Suggestion/index');
export import Factor = require('./Factor/index');
export import Entity = require('./Entity/index');
export import Matrix = require('./Matrix/index');
