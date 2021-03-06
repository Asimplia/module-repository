
import ITodoObject = require('./ITodoObject');
import Reason = require('../Reason');
import IReasonObject = require('../IReasonObject');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import List = Util.ODBM.Entity.List;
import Type = Util.ODBM.Mapping.Type;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;
import ILocalizedStringObject = require('../../Locale/ILocalizedStringObject');
/* tslint:disable */
Util;
/* tslint:enable */

export = Todo;
class Todo {

	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		id: new Type.Id(Type.String),
		eShopId: Type.Integer,
		title: {
			cs: new Type.String(256),
			en: new Type.String(256)
		},
		shortTitle: {
			cs: new Type.String(),
			en: new Type.String()
		},
		label: {
			cs: new Type.String(),
			en: new Type.String()
		},
		text: {
			cs: new Type.String(65000),
			en: new Type.String(65000)
		},
		createdAt: Type.Date
	};

	get Id() { return this.object.id; }
	get ReasonList() {
		return new List<Reason>(_.map(this.object.reasons, (object: IReasonObject) => {
			return Reason.fromObject(object);
		}));
	}
	get CreatedAt() { return this.object.createdAt; }
	get Title(): ILocalizedStringObject { return this.object.title; }
	get Text(): ILocalizedStringObject { return this.object.text; }

	constructor(private object: ITodoObject) {}

	isAcceptable() {
		return true; // TODO
	}

	isRemindable() {
		return false;
	}

	isExpired() {
		return false; // TODO
	}

	isDeclined() {
		return false;
	}
}
