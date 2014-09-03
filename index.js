﻿var mongoose = require('mongoose');
var pg = require('pg');
var neo4j = require('neo4j');

function connect(dsn) {
    exports.connectMongoDB(dsn);
}
exports.connect = connect;
function connectMongoDB(dsn) {
    mongoose.connect(dsn, function (e) {
        if (e) {
            throw e;
        }
        console.log('Connected MongoDB');
    });
}
exports.connectMongoDB = connectMongoDB;

var connectionListeners = [];
function connectPostgres(connectionString) {
    var schema = 'public';
    var client = new pg.Client(connectionString);
    client.connect(function (e) {
        if (e) {
            throw e;
            return;
        }
        console.log('Connected Postgres');
        exports.pgClient = client;
        connectionListeners.forEach(function (callback) {
            callback(exports.pgClient);
        });
    });
    client.query('SET search_path TO ' + schema + ';');
}
exports.connectPostgres = connectPostgres;
var neo4jListeners = [];
function connectNeo4j(dsn) {
    var db = new neo4j.GraphDatabase(dsn);
    db.query('RETURN 1;', {}, function (e, res) {
        if (e) {
            throw e;
        }
        console.log('Connected Neo4j');
        exports.neo4jDatabase = db;
        neo4jListeners.forEach(function (callback) {
            callback(exports.neo4jDatabase);
        });
    });
}
exports.connectNeo4j = connectNeo4j;
function getConnection(callback) {
    connectionListeners.push(callback);
    if (exports.pgClient) {
        callback(exports.pgClient);
    }
}
exports.getConnection = getConnection;
function getGraphDatabase(callback) {
    neo4jListeners.push(callback);
    if (exports.neo4jDatabase) {
        callback(exports.neo4jDatabase);
    }
}
exports.getGraphDatabase = getGraphDatabase;
exports.pgClient;
exports.neo4jDatabase;
var Suggestion = require('./Suggestion/index');
exports.Suggestion = Suggestion;
var Factor = require('./Factor/index');
exports.Factor = Factor;
var Entity = require('./Entity/index');
exports.Entity = Entity;
var Matrix = require('./Matrix/index');
exports.Matrix = Matrix;
var Placeholder = require('./Placeholder/index');
exports.Placeholder = Placeholder;
var Application = require('./Application/index');
exports.Application = Application;
var Load = require('./Load/index');
exports.Load = Load;
