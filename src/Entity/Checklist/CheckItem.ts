
import _ = require('underscore');
import ICheckItemObject = require('./ICheckItemObject');
import ValueList = require('./ValueList');
import Value = require('./Value');
import LocalizedString = require('../Locale/LocalizedString');
import ICheckItemId = require('./ICheckItemId');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
/* tslint:disable */
Util;
/* tslint:enable */

export = CheckItem;
class CheckItem {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		label: {
			cs: new Type.String(2048),
			en: new Type.String(2048)
		},
		values: new Type.Array(Value.$entity),
		checkItemId: {
			productId: Type.Integer
		}
	};
	private static converter = new Converter<CheckItem, ICheckItemObject>(CheckItem);

	get Id() { return this.object.checkItemId; }
	get Label() { return new LocalizedString(this.object.label); }
	get ValueList() { return new ValueList(_.map(this.object.values, Value.fromObject)); }

	constructor(
		private object: ICheckItemObject
	) {}

	isChecked() {
		return this.ValueList.areAllChecked();
	}

	isDone() {
		return this.ValueList.areAllDone();
	}

	isIdEqual(checkItemId: ICheckItemId) {
		return checkItemId.productId == this.Id.productId;
	}

	static fromObject(object: ICheckItemObject) {
		return CheckItem.converter.fromObject(object);
	}

	static toObject(entity: CheckItem): ICheckItemObject {
		return CheckItem.converter.toObject(entity);
	}

	toObject() {
		return CheckItem.toObject(this);
	}
}
