var Company = (function () {
    function Company(id, name, vatNumber) {
        this.id = id;
        this.name = name;
        this.vatNumber = vatNumber;
    }
    Object.defineProperty(Company.prototype, "Id", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Company.prototype, "Name", {
        get: function () {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Company.prototype, "VATNumber", {
        get: function () {
            return this.vatNumber;
        },
        enumerable: true,
        configurable: true
    });

    Company.prototype.toObject = function () {
        return Company.toObject(this);
    };

    Company.toObject = function (e) {
        return {
            id: e.id,
            name: e.name,
            vatNumber: e.vatNumber
        };
    };

    Company.fromObject = function (o) {
        return new Company(o.id, o.name, o.vatNumber);
    };
    return Company;
})();
module.exports = Company;
