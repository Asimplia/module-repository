
import LocalizedString = require('../../Locale/LocalizedString');
import ValueTypeList = require('./ValueTypeList');
import ValueType = require('./ValueType');
import IValueTypeGroupObject = require('./IValueTypeGroupObject');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
/* tslint:disable */
Util;
/* tslint:enable */

export = ValueTypeGroup;
class ValueTypeGroup {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		type: new Type.Id(Type.String),
		name: LocalizedString.$entity,
		valueTypes: new Type.Array(ValueType.$entity)
	};
	private static converter = new Converter<ValueTypeGroup, IValueTypeGroupObject>(ValueTypeGroup);

	private object: IValueTypeGroupObject;

	get Name() { return new LocalizedString(this.object.name); }
	get Type() { return this.object.type; }
	get ValueTypeList() {
		return ValueTypeGroup.converter.getList<ValueTypeList, ValueType>(
			ValueTypeList, ValueType, this.object.valueTypes
		);
	}

	constructor(
		type: string,
		name: LocalizedString,
		valueTypeList: ValueTypeList
	) {
		this.object = {
			type: type,
			name: name ? name.toObject() : null,
			valueTypes: valueTypeList ? valueTypeList.toArray(ValueType.toObject) : null
		};
	}

	static toObject(entity: ValueTypeGroup) {
		return ValueTypeGroup.converter.toObject(entity);
	}
}
