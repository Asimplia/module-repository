
import LocalizedString = require('../../Locale/LocalizedString');
import ValueTypeEnum = require('../ValueTypeEnum');
import IValueTypeObject = require('./IValueTypeObject');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
/* tslint:disable */
Util;
/* tslint:enable */

export = ValueType;
class ValueType {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		type: new Type.Id(Type.String),
		name: LocalizedString.$entity,
		message: LocalizedString.$entity
	};

	private object: IValueTypeObject;

	get Name() { return new LocalizedString(this.object.name); }
	get Message() { return new LocalizedString(this.object.message); }
	get Type(): ValueTypeEnum { return ValueTypeEnum[this.object.type]; }
	get TypeValue(): string { return this.object.type; }

	constructor(
		type: ValueTypeEnum,
		name: LocalizedString,
		message: LocalizedString
	) {
		this.object = {
			type: ValueTypeEnum[type],
			name: name ? name.toObject() : null,
			message: message ? message.toObject() : null
		};
	}

	static toObject(entity: ValueType) {
		return entity.object; // TODO make it by Converter
	}
}
