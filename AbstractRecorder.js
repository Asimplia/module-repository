var AbstractRecorder = (function () {
    function AbstractRecorder() {
    }
    AbstractRecorder.prototype.update = function (entityDocument, entityFactory, entity, callback) {
        var entityObject = entity.toObject();
        entityDocument.update(entityObject, { upsert: true }, function (e, res) {
            if (e) {
                callback(e);
                return;
            }
            callback(null, entity);
        });
    };

    AbstractRecorder.prototype.getNextId = function (model, callback) {
        model.findOne({}, { 'id': true }, { sort: '-id' }, function (e, doc) {
            if (!doc) {
                callback(1);
                return;
            }
            callback(1 + parseInt(doc.id));
        });
    };
    return AbstractRecorder;
})();
module.exports = AbstractRecorder;
