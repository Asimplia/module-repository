
import ScriptTypeEnum = require('./Error/ScriptTypeEnum');
import NotAllowedNull = require('./Error/NotAllowedNull');
import moment = require('moment');
import _ = require('underscore');

export = EntityPreparer;
class EntityPreparer {
	
	static string(value: any): string {
		if (EntityPreparer.isNull(value)) {
			console.warn(new NotAllowedNull(ScriptTypeEnum.STRING));
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
			console.warn(new NotAllowedNull(ScriptTypeEnum.DATE));
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
			console.warn(new NotAllowedNull(ScriptTypeEnum.BOOLEAN));
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
			console.warn(new NotAllowedNull(ScriptTypeEnum.INT));
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
			console.warn(new NotAllowedNull(ScriptTypeEnum.FLOAT));
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

	static getPrefixedColumns(EntityStatic: any) {
		var prefix = this.getTypeName(EntityStatic);
		var columns = _.map(EntityStatic, (columnName: string, keyName: string) => {
			return keyName.substring(0, 7) === 'COLUMN_' ? columnName : null;
		});
		return _.filter(columns, (column: string) => {
			return column !== null;
		});
	}

	private static getTypeName(obj: any) {
	    return Object.prototype.toString.call(obj).slice(8, -1);
	}

	static now() {
		return moment().toDate();
	}

	static isNull(value: any) {
		return value === null || typeof value === 'undefined';
	}

	static fromDate(value: Date) {
		return moment(value).format('YYYY-MM-DD HH:mm:ss');
	}
}
