/// <reference path="typings/mongoose/mongoose.d.ts" />
import mongoose = require('mongoose');
var pg = require('pg');

/** @depreceted */
export function connect(dsn: string) {
	connectMongoDB(dsn);
}
export function connectMongoDB(dsn: string) {
	mongoose.connect(dsn, (e) => {
		if (e) {
			throw e;
		}
		console.log('Connected MongoDB');
	});
}

var connectionListeners = [];
export function connectPostgres(connectionString: string) {
	var schema = 'datamart'; // TODO
	var client = new pg.Client(connectionString);
	client.connect(() => {
		console.log('Connected Postgres');
		pgClient = client;
		connectionListeners.forEach((callback) => {
			callback(pgClient);
		});
	});
	client.query('SET search_path TO '+schema+';');
}
export function getConnection(callback: (connection: any) => void) {
	connectionListeners.push(callback);
	if (pgClient) {
		callback(pgClient);
	}
}
export var pgClient;
export import Suggestion = require('./Suggestion/index');
export import Factor = require('./Factor/index');
export import Entity = require('./Entity/index');
export import Matrix = require('./Matrix/index');
