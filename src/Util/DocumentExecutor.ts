
import mongoose = require('mongoose');
import IEntity = require('../Entity/IEntity');
import IEntityStatic = require('../Entity/IEntityStatic');
import List = require('../Entity/List');
import EntityPreparer = require('../Entity/EntityPreparer');

export = DocumentExecutor;
class DocumentExecutor {

	constructor(
		private model: mongoose.Model<mongoose.Document>, 
		private EntityStatic: IEntityStatic
	) { }

	createByObject(e: Error, object: mongoose.Document, callback: (e: Error, entity?: IEntity) => void) {
		if (e) {
			callback(e);
			return;
		}
		if (!object) {
			callback(null, null);
			return;
		}
		callback(null, this.EntityStatic.fromObject(object));
	}

	createListByObjects(e: Error, objects: mongoose.Document[], callback: (e: Error, list?: List<IEntity>) => void) {
		if (e) {
			callback(e);
			return;
		}
		callback(null, new List<any>(objects, this.EntityStatic.fromObject));
	}

	createIntValue(e: Error, value: any, callback: (e: Error, value?: number) => void, key?: string) {
		if (e) {
			callback(e);
			return;
		}
		if (!value) {
			callback(null, null);
			return;
		}
		callback(null, EntityPreparer.int(key ? value[key] : value));
	}

	createDateValue(e: Error, value: any, callback: (e: Error, value?: Date) => void, key?: string) {
		if (e) {
			callback(e);
			return;
		}
		if (!value) {
			callback(null, null);
			return;
		}
		callback(null, EntityPreparer.date(key ? value[key] : value));
	}
}
