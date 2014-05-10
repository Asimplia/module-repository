var Factor = (function () {
    function Factor(id, name, description, section, weight, values) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.section = section;
        this.weight = weight;
        this.values = values;
    }
    Factor.fromObject = function (o /*FactorObject*/ ) {
        return new Factor(o.id, o.name, o.description, o.section, o.weight, o.values);
    };

    Factor.toObject = function (entity) {
        return {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            section: entity.section,
            weight: entity.weight,
            values: entity.values
        };
    };

    Factor.prototype.toObject = function () {
        return Factor.toObject(this);
    };
    return Factor;
})();
module.exports = Factor;
//# sourceMappingURL=Factor.js.map
