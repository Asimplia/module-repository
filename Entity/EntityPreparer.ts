
import ScriptTypeEnum = require('./Error/ScriptTypeEnum');
import NotAllowedNull = require('./Error/NotAllowedNull');
import moment = require('moment');

export = EntityPreparer;
class EntityPreparer {
	
	static string(value: any): string {
		if (EntityPreparer.isNull(value)) {
			throw new NotAllowedNull(ScriptTypeEnum.STRING);
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
			throw new NotAllowedNull(ScriptTypeEnum.DATE);
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
			throw new NotAllowedNull(ScriptTypeEnum.BOOLEAN);
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
			throw new NotAllowedNull(ScriptTypeEnum.INT);
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
			throw new NotAllowedNull(ScriptTypeEnum.FLOAT);
		}
		return parseFloat(value);
	}

	static floatOrNull(value: any): number {
		if (EntityPreparer.isNull(value)) {
			return null;
		}
		return EntityPreparer.float(value);
	}

	static now() {
		return moment().toDate();
	}

	static isNull(value: any) {
		return value === null || typeof value === 'undefined';
	}

	static fromDate(value: Date) {
		return moment(value).format('YYYY-MM-DD hh:mm:ss');
	}
}
