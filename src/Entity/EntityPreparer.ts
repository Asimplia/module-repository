
import ScriptTypeEnum = require('./Error/ScriptTypeEnum');
import NotAllowedNullError = require('./Error/Error/NotAllowedNullError');
import ColumnNotExistsInEntityError = require('./Error/Error/ColumnNotExistsInEntityError');
import ITableEntityStatic = require('./Common/ITableEntityStatic');
import IEntity = require('./IEntity');
import moment = require('moment');
import _ = require('underscore');

export = EntityPreparer;
class EntityPreparer {

	static string(value: any): string {
		if (EntityPreparer.isNull(value)) {
			throw new NotAllowedNullError(ScriptTypeEnum.STRING);
		}
		return '' + value;
	}

	static stringOrNull(value: any): string {
		if (EntityPreparer.isNull(value)) {
			return null;
		}
		return EntityPreparer.string(value);
	}

	static id(value: any) {
		return this.stringOrNull(value);
	}

	static idNumeric(value: any) {
		return this.intOrNull(value);
	}

	static enum<Enum>(EnumStatic: any, value: any): Enum {
		if (_.isNumber(value)) {
			if (typeof EnumStatic[value] === 'undefined') {
				throw new Error('Enum value is not in ' + EnumStatic);
			}
			if (EntityPreparer.isNull(value)) {
				throw new NotAllowedNullError(ScriptTypeEnum.ENUM);
			}
			return value;
		}
		if (EntityPreparer.isNull(value)) {
			throw new NotAllowedNullError(ScriptTypeEnum.ENUM);
		}
		return EnumStatic[value];
	}

	static date(value: any): Date {
		if (EntityPreparer.isNull(value)) {
			throw new NotAllowedNullError(ScriptTypeEnum.DATE);
		}
		return moment(value).toDate();
	}

	static dateOrNull(value: any): Date {
		if (EntityPreparer.isNull(value)) {
			return null;
		}
		return EntityPreparer.date(value);
	}

	static boolean(value: any): boolean {
		if (EntityPreparer.isNull(value)) {
			throw new NotAllowedNullError(ScriptTypeEnum.BOOLEAN);
		}
		return !!value;
	}

	static booleanOrNull(value: any): boolean {
		if (EntityPreparer.isNull(value)) {
			return null;
		}
		return EntityPreparer.boolean(value);
	}

	static int(value: any): number {
		if (EntityPreparer.isNull(value)) {
			throw new NotAllowedNullError(ScriptTypeEnum.INT);
		}
		return parseInt(value, 10);
	}

	static intOrNull(value: any): number {
		if (EntityPreparer.isNull(value)) {
			return null;
		}
		return EntityPreparer.int(value);
	}

	static float(value: any): number {
		if (EntityPreparer.isNull(value)) {
			throw new NotAllowedNullError(ScriptTypeEnum.FLOAT);
		}
		return parseFloat(value);
	}

	static floatOrNull(value: any): number {
		if (EntityPreparer.isNull(value)) {
			return null;
		}
		return EntityPreparer.float(value);
	}

	static fromRow<Entity extends IEntity>(EntityStatic: ITableEntityStatic, row: any): Entity {
		var keys = EntityPreparer.getKeys(EntityStatic);
		var object = {};
		keys.forEach((key: string) => {
			object[key] = row[EntityPreparer.getTableColumnByKey(EntityStatic, key)];
		});
		return <Entity>EntityStatic.fromObject(object);
	}

	static tableEntityToObject<Entity>(EntityStatic: ITableEntityStatic, entity: Entity): any {
		var keys = EntityPreparer.getKeys(EntityStatic);
		var object = {};
		keys.forEach((key: string) => {
			object[key] = entity[key];
		});
		return object;
	}

	static getColumnsAsPrefixedAlias(EntityStatic: ITableEntityStatic) {
		var columns = [];
		for (var i in Object.keys(EntityStatic)) {
			var constantName = Object.keys(EntityStatic)[i];
			if (constantName.substring(0, 7) === 'COLUMN_') {
				columns.push(
					EntityPreparer.getTableColumnByConstantName(EntityStatic, constantName)
					+ ' AS "' + EntityPreparer.getTableColumnByConstantName(EntityStatic, constantName) + '"'
				);
			}
		}
		return columns;
	}

	static getTableColumns(EntityStatic: ITableEntityStatic) {
		var columns = [];
		for (var i in Object.keys(EntityStatic)) {
			var constantName = Object.keys(EntityStatic)[i];
			if (constantName.substring(0, 7) === 'COLUMN_') {
				columns.push(EntityPreparer.getTableColumnByConstantName(EntityStatic, constantName));
			}
		}
		return columns;
	}

	static getTablePlainColumns(EntityStatic: ITableEntityStatic) {
		var columns = [];
		for (var i in Object.keys(EntityStatic)) {
			var constantName = Object.keys(EntityStatic)[i];
			if (constantName.substring(0, 7) === 'COLUMN_') {
				columns.push(EntityStatic[constantName]);
			}
		}
		return columns;
	}

	static getKeys(EntityStatic: ITableEntityStatic): string[] {
		var keys = [];
		for (var i in Object.keys(EntityStatic)) {
			var constantName = Object.keys(EntityStatic)[i];
			if (constantName.substring(0, 7) === 'COLUMN_') {
				var key: string;
				if (EntityPreparer.isIdColumn(EntityStatic, constantName)) {
					key = 'id';
				} else {
					var underscoredKeyName = constantName.substring(7);
					key = EntityPreparer.getCammelCaseByUnderscore(underscoredKeyName);
				}
				keys.push(key);
			}
		}
		return keys;
	}

	static isIdColumn(EntityStatic: ITableEntityStatic, constantName: string) {
		var underscoredKeyName = constantName.substring(7);
		var cammeledKeyName = EntityPreparer.getCammelCaseByUnderscore(underscoredKeyName);
		var entityNameFirstLower = EntityPreparer.toFirstLower((<any>EntityStatic).name);
		return entityNameFirstLower === cammeledKeyName.substr(0, entityNameFirstLower.length)
			&& cammeledKeyName.substring(entityNameFirstLower.length).toLowerCase() == 'id';
	}

	static toFirstLower(str: string) {
		return str.substring(0, 1).toLowerCase() + str.substring(1);
	}

	static getTableColumnByKey(EntityStatic: ITableEntityStatic, key: string): string {
		for (var i in Object.keys(EntityStatic)) {
			var constantName = Object.keys(EntityStatic)[i];
			if (constantName.substring(0, 7) === 'COLUMN_') {
				var underscoredKeyName = constantName.substring(7);
				var cammeledKeyName = EntityPreparer.getCammelCaseByUnderscore(underscoredKeyName);
				if (
					cammeledKeyName == key
					|| (key == 'id' && EntityPreparer.isIdColumn(EntityStatic, constantName))
				) {
					return EntityPreparer.getTableColumnByConstantName(EntityStatic, constantName);
				}
			}
		}
		throw new ColumnNotExistsInEntityError('Column with associated key ' + key + ' not exists' + EntityStatic);
	}

	static getTableColumnByConstantName(EntityStatic: ITableEntityStatic, constantName: string) {
		return EntityPreparer.getTableColumn(EntityStatic, EntityStatic[constantName]);
	}

	static getTableColumn(EntityStatic: ITableEntityStatic, plainColumn: string) {
		return EntityStatic.TABLE_NAME + '.' + plainColumn;
	}

	static getCammelCaseByUnderscore(underscored: string): string {
		return underscored.toLowerCase().replace(/[_]([a-z0-9])/g, function (g: string) { return g[1].toUpperCase(); });
	}

	static now() {
		return moment().toDate();
	}

	static isNull(value: any) {
		return value === null || typeof value === 'undefined';
	}

	static formatDate(value: Date) {
		return moment(value).format('YYYY-MM-DD\\THH:mm:ss.SSSZZ');
	}
}
