
import Repository = require('../../../src/index');
import EntityPreparer = Repository.Entity.EntityPreparer;
import IEntity = Repository.Entity.IEntity;
/* tslint:disable */
Repository;
/* tslint:enable */

class MockEntity implements IEntity {
	public static TABLE_NAME = 'schema.tableName';
	public static COLUMN_TEST_1 = 'test_1';
	public static COLUMN_TEST_2 = 'test2';
	public static COLUMN_MORE_WORD_NAME = 'somewordname';
	toObject() { return MockEntityNo.toObject(this); }
	static toObject(e: IEntity) { return {}; }
	static fromObject(o: any) { return new MockEntity; }
	static fromRow(o: any) { return new MockEntity; }
}
class MockEntityOne implements IEntity {
	public static TABLE_NAME = undefined;
	public static COLUMN_TEST_1 = 'test_1';
	toObject() { return MockEntityNo.toObject(this); }
	static toObject(e: IEntity) { return {}; }
	static fromObject(o: any) { return new MockEntityOne; }
	static fromRow(o: any) { return new MockEntityOne; }
}
class MockEntityNo implements IEntity {
	public static TABLE_NAME = 'schema.tableName';
	toObject() { return MockEntityNo.toObject(this); }
	static toObject(e: IEntity) { return {}; }
	static fromObject(o: any) { return new MockEntityNo; }
	static fromRow(o: any) { return new MockEntityNo; }
}
class MockEntityId implements IEntity {
	public static TABLE_NAME = 'some.table';
	public static COLUMN_MOCK_ENTITY_ID_ID = 'tableid';
	toObject() { return MockEntityId.toObject(this); }
	static toObject(e: IEntity) { return {}; }
	static fromObject(o: any) { return new MockEntityId; }
	static fromRow(o: any) { return new MockEntityId; }
}

describe('EntityPreparer', () => {
	describe('Class.name', () => {
		it('returns real name of passed Object', () => {
			expect((<any>MockEntity).name).toBe('MockEntity');
		});
	});

	describe('getColumnsAsPrefixedAlias', () => {
		it('returns aliased column names as its prefixed name', () => {
			expect(EntityPreparer.getColumnsAsPrefixedAlias(MockEntity))
			.toEqual([
				'schema.tableName.test_1 AS "schema.tableName.test_1"',
				'schema.tableName.test2 AS "schema.tableName.test2"',
				'schema.tableName.somewordname AS "schema.tableName.somewordname"'
			]);
		});
	});

	describe('getTableColumns', () => {
		it('returns more column names', () => {
			expect(EntityPreparer.getTableColumns(MockEntity)).toEqual([
				'schema.tableName.test_1', 'schema.tableName.test2', 'schema.tableName.somewordname'
			]);
		});
		it('returns one column name', () => {
			expect(EntityPreparer.getTableColumns(MockEntityOne)).toEqual(['undefined.test_1']);
		});
		it('returns no column names', () => {
			expect(EntityPreparer.getTableColumns(MockEntityNo)).toEqual([]);
		});
	});

	describe('getTableColumnByKey', () => {
		it('returns table.column by object key name with number', () => {
			expect(EntityPreparer.getTableColumnByKey(MockEntity, 'test1')).toEqual('schema.tableName.test_1');
		});
		it('returns table.column by object key name with more words', () => {
			expect(EntityPreparer.getTableColumnByKey(MockEntity, 'moreWordName')).toEqual('schema.tableName.somewordname');
		});
		it('returns table.column by object key name id', () => {
			expect(EntityPreparer.getTableColumnByKey(MockEntityId, 'id')).toEqual('some.table.tableid');
		});
	});

	describe('id', () => {
		it('should returns type string', () => {
			expect(typeof EntityPreparer.id('113')).toBe('string');
		});
	});

	describe('isIdColumn', () => {
		it('should true on COLUMN corresponds to entity class name', () => {
			expect(EntityPreparer.isIdColumn(MockEntity, 'COLUMN_MOCK_ENTITY_ID')).toBeTruthy();
			expect(EntityPreparer.isIdColumn(MockEntity, 'COLUMN_MOCK_NOENTI_ID')).toBeFalsy();
			expect(EntityPreparer.isIdColumn(MockEntity, 'COLUMN_MOCK_ENTITY')).toBeFalsy();
			expect(EntityPreparer.isIdColumn(MockEntity, 'COLUMN_MOCK_ENTITY_OD')).toBeFalsy();
			expect(EntityPreparer.isIdColumn(MockEntity, 'COLUMN_ID')).toBeFalsy();
		});
	});
});
