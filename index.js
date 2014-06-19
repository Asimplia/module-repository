var sql = require('node-sqlserver');

/** @depreceted */
function connect(dsn) {
    exports.connectMongoDB(dsn);
}
exports.connect = connect;
function connectMongoDB(dsn) {
    require('mongoose').connect(dsn);
}
exports.connectMongoDB = connectMongoDB;
function connectMSSQL(connectionString) {
    sql.open(connectionString, function (e, connection) {
        if (e) {
            throw e;
        }
        console.log('connected MSSQL');
        exports.mssqlConnection = connection;
    });
}
exports.connectMSSQL = connectMSSQL;
exports.mssqlConnection;
var Suggestion = require('./Suggestion/index');
exports.Suggestion = Suggestion;
var Factor = require('./Factor/index');
exports.Factor = Factor;
var Entity = require('./Entity/index');
exports.Entity = Entity;
var Matrix = require('./Matrix/index');
exports.Matrix = Matrix;
