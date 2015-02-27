
import ITodoObject = require('./ITodoObject');
import Reason = require('../Reason');
import IReasonObject = require('../IReasonObject');
import Util = require('asimplia-util');
import DatabaseSystem = Util.ODBM.Repository.DatabaseSystem;
import List = Util.ODBM.Entity.List;
import Type = Util.ODBM.Mapping.Type;
import Converter = Util.ODBM.Entity.Converter;
import IEntityAnnotation = Util.ODBM.Entity.Annotation.IEntityAnnotation;

export = Todo;
class Todo {
	
	static $entity: IEntityAnnotation = {
		$dbs: DatabaseSystem.MONGO_DB,
		id: new Type.Id(Type.String)
	};
	
	get Id() { return this.object.id; }
	get ReasonList() { 
		return new List<Reason>(_.map(this.object.reasons, (object: IReasonObject) => {
			return Reason.fromObject(object);
		}));
	}
	get CreatedAt() { return this.object.createdAt; }
	get Title() { return this.object.title; }
	get Text() { return this.object.text; }

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
