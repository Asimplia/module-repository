
/// <reference path="../typings/mongoose/mongoose.d.ts" />

import IEntity = require('./Entity/IEntity');
import mongoose = require('mongoose');

export = AbstractRecorder;
class AbstractRecorder {

	update(entityDocument: mongoose.Document, entityFactory: (object) => IEntity, entity: IEntity, callback: (e: Error, entity?: IEntity) => void) {
		var entityObject = entity.toObject();
		entityDocument.update(entityObject, { upsert: true }, (e, res) => {
			if (e) {
				callback(e);
				return;
			}
			callback(null, entity);
		});
	}

	getNextId(model: mongoose.Model<mongoose.Document>, callback: (id: number) => void) {
		model.findOne({}, { 'id': true }, { sort: '-id' }, (e, doc) => {
			if (!doc) {
				callback(1);
				return;
			}
			callback(1 + parseInt(doc.id));
		});
	}
}
