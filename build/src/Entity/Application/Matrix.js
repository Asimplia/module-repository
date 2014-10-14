var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MatrixMatrix = require('../Matrix/Matrix');

var Matrix = (function (_super) {
    __extends(Matrix, _super);
    function Matrix() {
        _super.apply(this, arguments);
    }
    return Matrix;
})(MatrixMatrix);
module.exports = Matrix;
