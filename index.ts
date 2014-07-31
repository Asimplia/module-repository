/// <reference path="typings/mongoose/mongoose.d.ts" />
import mongoose = require('mongoose');
var pg = require('pg');
var neo4j = require('neo4j');

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
	var schema = 'public'; // TODO
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
export function connectNeo4j(dsn: string) {
	var db = new neo4j.GraphDatabase(dsn);
	db.query('MATCH (n) RETURN 1;', {}, (e: Error, res: any) => {
		if (e) {
			throw e;
		}
		console.log('Connected Neo4j');
		neo4jDatabase = db;
	});
}
export function getConnection(callback: (connection: any) => void) {
	connectionListeners.push(callback);
	if (pgClient) {
		callback(pgClient);
	}
}
export var pgClient;
export var neo4jDatabase;
export import Suggestion = require('./Suggestion/index');
export import Factor = require('./Factor/index');
export import Entity = require('./Entity/index');
export import Matrix = require('./Matrix/index');
