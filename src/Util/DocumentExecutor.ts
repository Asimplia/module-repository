
import mongoose = require('mongoose');
import IIdentificableEntity = require('../Entity/IIdentificableEntity');
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

	insertOrUpdate(entity: IIdentificableEntity, callback: (e: Error, entity?: IEntity) => void) {
		if (entity.Id) {
			this.model.findOne({ id: entity.Id })
			.exec((e: Error, doc: mongoose.Document) => {
				if (e) {
					callback(e);
					return;
				}
				if (doc) {
					this.updateDocument(entity, doc, callback);
				} else {
					this.insert(entity, callback);
				}
			});
		} else {
			this.insert(entity, callback);
		}
	}

	update(entity: IIdentificableEntity, callback: (e: Error, entity?: IEntity) => void) {
		this.model.findOne({ id: entity.Id })
		.exec((e: Error, doc: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!doc) {
				callback(new Error('Entity not found'))
				return;
			}
			this.updateDocument(entity, doc, callback);
		});
	}

	private updateDocument(entity: IIdentificableEntity, doc: mongoose.Document, callback: (e: Error, entity?: IEntity) => void) {
		var object = entity.toObject();
		doc.update(object, {}, (e: Error, affectedRows: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, entity);
		});
	}

	insert(entity: IIdentificableEntity, callback: (e: Error, entity?: IEntity) => void) {
		var insert = (entity: IIdentificableEntity) => {
			var object = entity.toObject();
			var doc = new this.model(object);
			doc.update(object, { upsert: true }, (e: Error, affectedRows: number) => {
				if (e) {
					callback(e);
					return;
				}
				callback(null, entity);
			});
		};
		if (entity.Id) {
			insert(entity);
		} else {
			this.getNextId((e: Error, id?: number) => {
				if (e) {
					callback(e);
					return;
				}
				entity.Id = id;
				insert(entity);
			});
		}
	}

	private getNextId(callback: (e: Error, id?: number) => void) {
		this.model.findOne({}, { 'id': true })
		.sort('-id')
		.limit(1)
		.exec((e: Error, doc: mongoose.Document) => {
			if (e) {
				callback(e);
				return;
			}
			if (!doc) {
				callback(null, 1);
				return;
			}
			callback(null, 1 + parseInt(doc.id));
		});
	}

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
