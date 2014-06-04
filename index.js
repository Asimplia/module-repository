var AsimpliaUtil = require('asimplia-util');
var mssql = require('mssql');

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
    var config = AsimpliaUtil.SQLServer.parseConnectionString(connectionString);
    exports.mssqlConnection = new mssql.Connection(config);
    exports.mssqlConnection.connect(function (e) {
        if (e) {
            throw e;
        }
    });
}
exports.connectMSSQL = connectMSSQL;
exports.mssqlConnection;
