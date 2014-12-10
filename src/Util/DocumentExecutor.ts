
import mongoose = require('mongoose');
import each = require('each');
import _ = require('underscore');
import IIdentificableEntity = require('../Entity/IIdentificableEntity');
import IEntity = require('../Entity/IEntity');
import IEntityStatic = require('../Entity/IEntityStatic');
import List = require('../Entity/List');
import EntityPreparer = require('../Entity/EntityPreparer');

// TODO move it to mongoose.d.ts & DefinitelyTyped repo
interface MongooseCollection {
	insert(docs: any[], callback: (e: Error, docs?: mongoose.Document[]) => void): void;
}

export = DocumentExecutor;
class DocumentExecutor {

	constructor(
		private model: mongoose.Model<mongoose.Document>, 
		private EntityStatic: IEntityStatic
	) { }

	insertList(list: List<IIdentificableEntity>, callback: (e: Error, list?: List<IEntity>) => void) {
		this.getNextId((e: Error, nextId?: number) => {
			if (e) {
				callback(e);
				return;
			}
			list.forEach((entity: IIdentificableEntity) => {
				if (entity.Id) {
					entity.Id = nextId++;
				}
			});
			var objects = list.toArray(this.EntityStatic.toObject);
			(<MongooseCollection>this.model.collection).insert(objects, (e: Error, docs?: mongoose.Document[]) => {
				if (e) {
					callback(e);
					return;
				}
				callback(null, list);
			});
		});
	}

	updateList(list: List<IIdentificableEntity>, callback: (e: Error, list?: List<IEntity>) => void) {
		var ids = list.map((entity: IIdentificableEntity) => {
			return entity.Id;
		}).filter((id: number) => {
			return id !== null;
		}).toArray();
		this.model.find({ id: { $in: ids } })
		.exec((e: Error, docs?: mongoose.Document[]) => {
			if (e) {
				callback(e);
				return;
			}
			if (docs.length != list.count()) {
				callback(new Error('Some entities not found'));
				return;
			}
			var indexById = list.indexBy('Id');
			each(docs)
			.on('item', (doc: mongoose.Document, next: (e?: Error) => void) => {
				var loadedEntity = <IIdentificableEntity>this.EntityStatic.fromObject(doc.toObject()); // TODO create IdentificableEntityStatic
				var entity = indexById[loadedEntity.Id];
				this.updateDocument(entity, doc, next);
			})
			.on('error', (e: Error) => {
				callback(e);
			})
			.on('end', () => {
				callback(null, list);
			});
		});
	}

	insertOrUpdateList(list: List<IIdentificableEntity>, callback: (e: Error, list?: List<IEntity>) => void) {
		var ids = list.map((entity: IIdentificableEntity) => {
			return entity.Id;
		}).filter((id: number) => {
			return id !== null;
		}).toArray();
		this.model.find({ id: { $in: ids } })
		.exec((e: Error, docs?: mongoose.Document[]) => {
			if (e) {
				callback(e);
				return;
			}
			var loadedIds = _.map(docs, (doc: mongoose.Document) => {
				var loadedEntity = <IIdentificableEntity>this.EntityStatic.fromObject(doc.toObject()); // TODO create IdentificableEntityStatic
				return loadedEntity.Id;
			});
			var listToInsert = list.filter((entity: IIdentificableEntity) => {
				return loadedIds.indexOf(entity.Id) === -1
			});
			var listToUpdate = list.filter((entity: IIdentificableEntity) => {
				return loadedIds.indexOf(entity.Id) !== -1
			});

			var processCallbacks = [];
			if (listToInsert.count()) {
				processCallbacks.push((next: () => void) => {
					this.insertList(listToInsert, next);
				});
			}
			if (listToUpdate.count()) {
				processCallbacks.push((next: () => void) => {
					this.updateList(listToUpdate, next);
				});
			}
			each(processCallbacks)
			.on('item', (process: (next: (e?: Error) => void) => void, next: (e?: Error) => void) => {
				process(next);
			})
			.on('error', (e: Error) => {
				callback(e);
			})
			.on('end', () => {
				callback(null, list);
			});
		});
	}

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
		
		if (entity.Id) {
			this.insertWithId(entity, callback);
		} else {
			this.getNextId((e: Error, id?: number) => {
				if (e) {
					callback(e);
					return;
				}
				entity.Id = id;
				this.insertWithId(entity, callback);
			});
		}
	}

	private insertWithId(entity: IIdentificableEntity, callback: (e: Error, entity?: IEntity) => void) {
		var object = entity.toObject();
		var doc = new this.model(object);
		doc.update(object, { upsert: true }, (e: Error, affectedRows: number) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, entity);
		});
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
