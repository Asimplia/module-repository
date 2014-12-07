
import ScriptTypeEnum = require('./Error/ScriptTypeEnum');
import NotAllowedNullError = require('./Error/Error/NotAllowedNullError');
import ColumnNotExistsInEntityError = require('./Error/Error/ColumnNotExistsInEntityError');
import IEntityStatic = require('./IEntityStatic');
import moment = require('moment');
import _ = require('underscore');

export = EntityPreparer;
class EntityPreparer {
	
	static string(value: any): string {
		if (EntityPreparer.isNull(value)) {
			console.warn(new NotAllowedNullError(ScriptTypeEnum.STRING));
			return null;
		}
		return ""+value;
	}

	static stringOrNull(value: any): string {
		if (EntityPreparer.isNull(value)) {
			return null;
		}
		return EntityPreparer.string(value);
	}

	static date(value: any): Date {
		if (EntityPreparer.isNull(value)) {
			console.warn(new NotAllowedNullError(ScriptTypeEnum.DATE));
			return null;
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
			console.warn(new NotAllowedNullError(ScriptTypeEnum.BOOLEAN));
			return null;
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
			console.warn(new NotAllowedNullError(ScriptTypeEnum.INT));
			return null;
		}
		return parseInt(value);
	}

	static intOrNull(value: any): number {
		if (EntityPreparer.isNull(value)) {
			return null;
		}
		return EntityPreparer.int(value);
	}
	
	static float(value: any): number {
		if (EntityPreparer.isNull(value)) {
			console.warn(new NotAllowedNullError(ScriptTypeEnum.FLOAT));
			return null;
		}
		return parseFloat(value);
	}

	static floatOrNull(value: any): number {
		if (EntityPreparer.isNull(value)) {
			return null;
		}
		return EntityPreparer.float(value);
	}

	static getColumnsAsPrefixedAlias(EntityStatic: IEntityStatic) {
		var columns = [];
		for (var i in Object.keys(EntityStatic)) {
			var keyName = Object.keys(EntityStatic)[i];
			if(keyName.substring(0, 7) === 'COLUMN_') {
				columns.push(EntityStatic.TABLE_NAME + '.' + EntityStatic[keyName] + ' AS "' + EntityStatic.TABLE_NAME + '.' + EntityStatic[keyName] + '"');
			}
		}
		return columns;
	}

	static getTableColumns(EntityStatic: IEntityStatic) {
		var columns = [];
		for (var i in Object.keys(EntityStatic)) {
			var keyName = Object.keys(EntityStatic)[i];
			if(keyName.substring(0, 7) === 'COLUMN_') {
				columns.push(EntityStatic.TABLE_NAME + '.' + EntityStatic[keyName]);
			}
		}
		return columns;
	}

	static getTablePlainColumns(EntityStatic: IEntityStatic) {
		var columns = [];
		for (var i in Object.keys(EntityStatic)) {
			var keyName = Object.keys(EntityStatic)[i];
			if(keyName.substring(0, 7) === 'COLUMN_') {
				columns.push(EntityStatic[keyName]);
			}
		}
		return columns;
	}

	static getTableColumnByKey(EntityStatic: IEntityStatic, key: string): string {
		for (var i in Object.keys(EntityStatic)) {
			var keyName = Object.keys(EntityStatic)[i];
			if(keyName.substring(0, 7) === 'COLUMN_') {
				var underscoredKeyName = keyName.substring(7);
				var cammeledKeyName = EntityPreparer.getCammelCaseByUnderscore(underscoredKeyName);
				if (cammeledKeyName == key || (key == 'id' && cammeledKeyName.substring((<any>EntityStatic).name.length).toLowerCase() == 'id')) {
					return EntityStatic.TABLE_NAME + '.' + EntityStatic[keyName]
				}
			}
		}
		throw new ColumnNotExistsInEntityError('Column with associated key ' + key + ' not exists' + EntityStatic);
	}

	static getCammelCaseByUnderscore(underscored) {
		return underscored.toLowerCase().replace(/[_]([a-z0-9])/g, function (g) { return g[1].toUpperCase(); })
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
