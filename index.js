var mongoose = require('mongoose');
var pg = require('pg');

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
function getConnection(callback) {
    connectionListeners.push(callback);
    if (exports.pgClient) {
        callback(exports.pgClient);
    }
}
exports.getConnection = getConnection;
exports.pgClient;
var Suggestion = require('./Suggestion/index');
exports.Suggestion = Suggestion;
var Factor = require('./Factor/index');
exports.Factor = Factor;
var Entity = require('./Entity/index');
exports.Entity = Entity;
var Matrix = require('./Matrix/index');
exports.Matrix = Matrix;
