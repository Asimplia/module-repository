
var each = require('each');
import _ = require('underscore');
import IEntity = require('./IEntity');

export = List;
class List<Entity extends IEntity> {
	private entities: Entity[] = [];

	constructor(items?: Entity[], entityFactory?: (o: any) => Entity) {
		if (typeof items !== 'undefined', typeof entityFactory !== 'undefined') {
			this.pushArray(items, entityFactory);
		}
	}

	pushArray(items: any[], entityFactory: (o: any) => Entity) {
		if (!items) {
			return this;
		}
		items.forEach((item) => {
			try {
				this.entities.push(entityFactory(item));
			} catch (e) {
				console.warn('Entity was deleted from List becouse error happened during create entity', item, e);
			}
		});
		return this;
	}

	push(item: Entity): List<Entity> {
		this.entities.push(item);
		return this;
	}

	toArray(objectFactory: (entity: Entity) => any) {
		var array = [];
		this.entities.forEach((entity: Entity) => {
			try {
				array.push(objectFactory(entity));
			} catch (e) {
				console.warn('Entity was deleted from array becouse error happened during create object', entity, e);
			}
		});
		return array;
	}

	filter(cb: (entity: Entity) => boolean) {
		return new List<Entity>(_.filter(this.entities, cb), this.returnValue);
	}

	map(cb: (entity: Entity) => any) {
		return new List<any>(_.map(this.entities, cb), this.returnValue);
	}

	createEach() {
		return each(this.entities);
	}

	private returnValue(entity: Entity) {
		return entity;
	}
}
