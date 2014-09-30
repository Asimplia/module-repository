var Repository = require("../../../index");
var EntityPreparer = Repository.Entity.EntityPreparer;
Repository;

var MockEntity = (function () {
    function MockEntity() {
    }
    MockEntity.COLUMN_TEST_1 = 'test_1';
    MockEntity.COLUMN_TEST_2 = 'test2';
    return MockEntity;
})();

describe("getPrefixedColumns", function () {
    it("returns more column names", function () {
        expect(EntityPreparer.getPrefixedColumns(MockEntity)).toBe(['test_1', 'test2']);
    });
});
