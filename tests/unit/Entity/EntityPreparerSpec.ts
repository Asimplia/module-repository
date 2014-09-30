
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../index.node.d.ts" />

import Repository = require("../../../index");
import EntityPreparer = Repository.Entity.EntityPreparer;
import ColumnNotExistsInEntityError = Repository.Entity.Error.Error.ColumnNotExistsInEntityError;
Repository;

class MockEntity {
	public static TABLE_NAME = 'schema.tableName';
	public static COLUMN_TEST_1 = 'test_1';
	public static COLUMN_TEST_2 = 'test2';
}
class MockEntityOne {
	public static COLUMN_TEST_1 = 'test_1';
}
class MockEntityNo {
}


describe("Class.name", () => {
	it("returns real name of passed Object", () => {
		expect((<any>MockEntity).name).toBe('MockEntity');
	});
});


describe("getPrefixedColumns", () => {
  it("returns more column names", () => {
    expect(EntityPreparer.getPrefixedColumns(MockEntity)).toEqual(['MockEntity_test_1', 'MockEntity_test2']);
  });
  it("returns one column name", () => {
    expect(EntityPreparer.getPrefixedColumns(MockEntityOne)).toEqual(['MockEntityOne_test_1']);
  });
  it("returns no column names", () => {
    expect(EntityPreparer.getPrefixedColumns(MockEntityNo)).toEqual([]);
  });
});


describe("getPrefixedColumn", () => {
  it("returns column name", () => {
    expect(EntityPreparer.getPrefixedColumn(MockEntity, MockEntity.COLUMN_TEST_1)).toBe('MockEntity_test_1');
    expect(EntityPreparer.getPrefixedColumn(MockEntity, MockEntity.COLUMN_TEST_2)).toBe('MockEntity_test2');
  });
  it("throws exception that column is not in Entity object specified", () => {
    expect(() => {
    	EntityPreparer.getPrefixedColumn(MockEntityOne, MockEntity.COLUMN_TEST_2)
    }).toThrow(new ColumnNotExistsInEntityError('Column "test2" not exists in Entity "MockEntityOne"'));
  });
});


describe("getColumnsAsPrefixedAlias", () => {
  it("returns aliased column names as its prefixed name", () => {
    expect(EntityPreparer.getColumnsAsPrefixedAlias(MockEntity))
    .toEqual(['schema.tableName.test_1 AS MockEntity_test_1', 'schema.tableName.test2 AS MockEntity_test2']);
  });
});


describe("getTableColumns", () => {
  it("returns more column names", () => {
    expect(EntityPreparer.getTableColumns(MockEntity)).toEqual(['schema.tableName.test_1', 'schema.tableName.test2']);
  });
  it("returns one column name", () => {
    expect(EntityPreparer.getTableColumns(MockEntityOne)).toEqual(['undefined.test_1']);
  });
  it("returns no column names", () => {
    expect(EntityPreparer.getTableColumns(MockEntityNo)).toEqual([]);
  });
});
