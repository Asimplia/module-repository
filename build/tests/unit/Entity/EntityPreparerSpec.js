var Repository = require("../../../src/index");
var EntityPreparer = Repository.Entity.EntityPreparer;

Repository;

var MockEntity = (function () {
    function MockEntity() {
    }
    MockEntity.prototype.toObject = function () {
        return MockEntityNo.toObject(this);
    };
    MockEntity.toObject = function (e) {
        return {};
    };
    MockEntity.fromObject = function (o) {
        return new MockEntity;
    };
    MockEntity.TABLE_NAME = 'schema.tableName';
    MockEntity.COLUMN_TEST_1 = 'test_1';
    MockEntity.COLUMN_TEST_2 = 'test2';
    MockEntity.COLUMN_MORE_WORD_NAME = 'somewordname';
    return MockEntity;
})();
var MockEntityOne = (function () {
    function MockEntityOne() {
    }
    MockEntityOne.prototype.toObject = function () {
        return MockEntityNo.toObject(this);
    };
    MockEntityOne.toObject = function (e) {
        return {};
    };
    MockEntityOne.fromObject = function (o) {
        return new MockEntityOne;
    };
    MockEntityOne.TABLE_NAME = undefined;
    MockEntityOne.COLUMN_TEST_1 = 'test_1';
    return MockEntityOne;
})();
var MockEntityNo = (function () {
    function MockEntityNo() {
    }
    MockEntityNo.prototype.toObject = function () {
        return MockEntityNo.toObject(this);
    };
    MockEntityNo.toObject = function (e) {
        return {};
    };
    MockEntityNo.fromObject = function (o) {
        return new MockEntityNo;
    };
    MockEntityNo.TABLE_NAME = 'schema.tableName';
    return MockEntityNo;
})();
var MockEntityId = (function () {
    function MockEntityId() {
    }
    MockEntityId.prototype.toObject = function () {
        return MockEntityId.toObject(this);
    };
    MockEntityId.toObject = function (e) {
        return {};
    };
    MockEntityId.fromObject = function (o) {
        return new MockEntityId;
    };
    MockEntityId.TABLE_NAME = 'some.table';
    MockEntityId.COLUMN_MOCK_ENTITY_ID_ID = 'tableid';
    return MockEntityId;
})();

describe("Class.name", function () {
    it("returns real name of passed Object", function () {
        expect(MockEntity.name).toBe('MockEntity');
    });
});

describe("getColumnsAsPrefixedAlias", function () {
    it("returns aliased column names as its prefixed name", function () {
        expect(EntityPreparer.getColumnsAsPrefixedAlias(MockEntity)).toEqual(['schema.tableName.test_1 AS "schema.tableName.test_1"', 'schema.tableName.test2 AS "schema.tableName.test2"', 'schema.tableName.somewordname AS "schema.tableName.somewordname"']);
    });
});

describe("getTableColumns", function () {
    it("returns more column names", function () {
        expect(EntityPreparer.getTableColumns(MockEntity)).toEqual(['schema.tableName.test_1', 'schema.tableName.test2', 'schema.tableName.somewordname']);
    });
    it("returns one column name", function () {
        expect(EntityPreparer.getTableColumns(MockEntityOne)).toEqual(['undefined.test_1']);
    });
    it("returns no column names", function () {
        expect(EntityPreparer.getTableColumns(MockEntityNo)).toEqual([]);
    });
});

describe("getTableColumnByKey", function () {
    it("returns table.column by object key name with number", function () {
        expect(EntityPreparer.getTableColumnByKey(MockEntity, 'test1')).toEqual('schema.tableName.test_1');
    });
    it("returns table.column by object key name with more words", function () {
        expect(EntityPreparer.getTableColumnByKey(MockEntity, 'moreWordName')).toEqual('schema.tableName.somewordname');
    });
    it("returns table.column by object key name id", function () {
        expect(EntityPreparer.getTableColumnByKey(MockEntityId, 'id')).toEqual('some.table.tableid');
    });
});
