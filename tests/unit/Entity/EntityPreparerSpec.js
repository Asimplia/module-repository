var Repository = require("../../../index");
var EntityPreparer = Repository.Entity.EntityPreparer;
var ColumnNotExistsInEntityError = Repository.Entity.Error.Error.ColumnNotExistsInEntityError;
Repository;

var MockEntity = (function () {
    function MockEntity() {
    }
    MockEntity.COLUMN_TEST_1 = 'test_1';
    MockEntity.COLUMN_TEST_2 = 'test2';
    return MockEntity;
})();
var MockEntityOne = (function () {
    function MockEntityOne() {
    }
    MockEntityOne.COLUMN_TEST_1 = 'test_1';
    return MockEntityOne;
})();
var MockEntityNo = (function () {
    function MockEntityNo() {
    }
    return MockEntityNo;
})();

describe("Class.name", function () {
    it("returns real name of passed Object", function () {
        expect(MockEntity.name).toBe('MockEntity');
    });
});

describe("getPrefixedColumns", function () {
    it("returns more column names", function () {
        expect(EntityPreparer.getPrefixedColumns(MockEntity)).toEqual(['MockEntity_test_1', 'MockEntity_test2']);
    });
    it("returns one column name", function () {
        expect(EntityPreparer.getPrefixedColumns(MockEntityOne)).toEqual(['MockEntityOne_test_1']);
    });
    it("returns no column names", function () {
        expect(EntityPreparer.getPrefixedColumns(MockEntityNo)).toEqual([]);
    });
});

describe("getPrefixedColumn", function () {
    it("returns column name", function () {
        expect(EntityPreparer.getPrefixedColumn(MockEntity, MockEntity.COLUMN_TEST_1)).toBe('MockEntity_test_1');
        expect(EntityPreparer.getPrefixedColumn(MockEntity, MockEntity.COLUMN_TEST_2)).toBe('MockEntity_test2');
    });
    it("throws exception that column is not in Entity object specified", function () {
        expect(function () {
            EntityPreparer.getPrefixedColumn(MockEntityOne, MockEntity.COLUMN_TEST_2);
        }).toThrow(new ColumnNotExistsInEntityError('Column "test2" not exists in Entity "MockEntityOne"'));
    });
});
