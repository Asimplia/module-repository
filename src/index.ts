﻿
// TODO delete after typings is added to DefinitelyTyped
/// <reference path="../typings_local/each/each.d.ts" />
/// <reference path="../typings_local/traceback/traceback.d.ts" />

import mongoose = require('mongoose');
var pg = require('pg');
var neo4j = require('neo4j');

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
	client.connect((e) => {
		if (e) {
			throw e;
			return;
		}
		console.log('Connected Postgres');
		pgClient = client;
		connectionListeners.forEach((callback) => {
			callback(pgClient);
		});
	});
	client.query('SET search_path TO '+schema+';');
}
var neo4jListeners = [];
export function connectNeo4j(dsn: string) {
	var db = new neo4j.GraphDatabase(dsn);
	db.query('RETURN 1;', {}, (e: Error, res: any) => {
		if (e) {
			throw e;
		}
		console.log('Connected Neo4j');
		neo4jDatabase = db;
		neo4jListeners.forEach((callback) => {
			callback(neo4jDatabase);
		});
	});
}
export function getConnection(callback: (connection: any) => void) {
	connectionListeners.push(callback);
	if (pgClient) {
		callback(pgClient);
	}
}
export function getGraphDatabase(callback: (db: any) => void) {
	neo4jListeners.push(callback);
	if (neo4jDatabase) {
		callback(neo4jDatabase);
	}
}
export var pgClient;
export var neo4jDatabase;
export import Suggestion = require('./Suggestion/index');
export import Factor = require('./Factor/index');
export import Entity = require('./Entity/index');
export import Matrix = require('./Matrix/index');
export import Section = require('./Section/index');
export import Placeholder = require('./Placeholder/index');
export import Application = require('./Application/index');
export import EShop = require('./EShop/index');
export import Error = require('./Error/index');
export import Load = require('./Load/index');
export import External = require('./External/index');
export import Site = require('./Site/index');
Suggestion;
Factor;
Entity;
Matrix;
Section;
Placeholder;
Application;
EShop;
Error;
Load;
External;
Site;
