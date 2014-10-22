var List = require('../Entity/List');
var MatrixDescription = require('../Entity/Matrix/MatrixDescription');
var MatrixDescriptionModel = require('../Definition/Matrix/MatrixDescriptionModel');

var MatrixDescriptionLoader = (function () {
    function MatrixDescriptionLoader() {
        this.model = MatrixDescriptionModel;
    }
    MatrixDescriptionLoader.prototype.getList = function (callback) {
        this.model.find({}, function (e, docs) {
            if (e) {
                return callback(e);
            }
            var list = new List(docs, MatrixDescription.fromObject);
            callback(null, list);
        });
    };
    return MatrixDescriptionLoader;
})();
module.exports = MatrixDescriptionLoader;
