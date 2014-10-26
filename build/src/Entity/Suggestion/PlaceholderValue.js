var ActionPlaceholderEnum = require('./ActionPlaceholderEnum');
var ActionPlaceholderFactory = require('./ActionPlaceholderFactory');

var PlaceholderValue = (function () {
    function PlaceholderValue(placeholder, value) {
        this.placeholder = placeholder;
        this.value = value;
    }
    Object.defineProperty(PlaceholderValue.prototype, "Placeholder", {
        get: function () {
            return this.placeholder;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PlaceholderValue.prototype, "Value", {
        get: function () {
            return this.value;
        },
        enumerable: true,
        configurable: true
    });

    PlaceholderValue.fromObject = function (object) {
        return new PlaceholderValue(ActionPlaceholderFactory.createActionPlaceholderEnum(object.placeholder), object.value);
    };

    PlaceholderValue.toObject = function (entity) {
        return {
            placeholder: ActionPlaceholderEnum[entity.placeholder],
            value: entity.value
        };
    };

    PlaceholderValue.prototype.toObject = function () {
        return PlaceholderValue.toObject(this);
    };
    return PlaceholderValue;
})();
module.exports = PlaceholderValue;
