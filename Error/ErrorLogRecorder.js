var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AbstractRecorder = require('../AbstractRecorder');
var ErrorLog = require('../Entity/Error/ErrorLog');
var ErrorLogModel = require('./ErrorLogModel');

var ErrorLogRecorder = (function (_super) {
    __extends(ErrorLogRecorder, _super);
    function ErrorLogRecorder() {
        _super.call(this);
        this.model = ErrorLogModel;
    }
    ErrorLogRecorder.prototype.insert = function (errorLog, callback) {
        var errorLogDocument = new this.model({});
        this.update(errorLogDocument, ErrorLog.fromObject, errorLog, callback);
    };
    return ErrorLogRecorder;
})(AbstractRecorder);
module.exports = ErrorLogRecorder;
