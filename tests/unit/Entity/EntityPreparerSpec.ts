
/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../index.node.d.ts" />

import Repository = require("../../../index");
import EntityPreparer = Repository.Entity.EntityPreparer;
Repository;

class MockEntity {
	public static COLUMN_TEST_1 = 'test_1';
	public static COLUMN_TEST_2 = 'test2';
}

describe("getPrefixedColumns", () => {
  it("returns more column names", () => {
    expect(EntityPreparer.getPrefixedColumns(MockEntity)).toBe(['test_1', 'test2']);
  });
});
