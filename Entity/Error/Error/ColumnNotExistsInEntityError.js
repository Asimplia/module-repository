var ColumnNotExistsInEntityError = (function () {
    function ColumnNotExistsInEntityError(message) {
        this.message = message;
        this.name = 'ColumnNotExistsInEntityError';
    }
    return ColumnNotExistsInEntityError;
})();
module.exports = ColumnNotExistsInEntityError;
