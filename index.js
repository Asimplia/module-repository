var mongoose = require('mongoose');
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
    client.connect(function () {
        console.log('Connected Postgres');
        exports.pgClient = client;
        connectionListeners.forEach(function (callback) {
            callback(exports.pgClient);
        });
    });
    client.query('SET search_path TO ' + schema + ';');
}
exports.connectPostgres = connectPostgres;
function connectNeo4j(dsn) {
    var db = new neo4j.GraphDatabase(dsn);
    db.query('MATCH (n) RETURN 1;', {}, function (e, res) {
        if (e) {
            throw e;
        }
        console.log('Connected Neo4j');
        exports.neo4jDatabase = db;
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
