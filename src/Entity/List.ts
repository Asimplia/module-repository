
import each = require('each');
import _ = require('underscore');
import IEntity = require('./IEntity');
import Util = require('asimplia-util');
import EntityList = Util.ODBM.Entity.List;

export = List;
class List<Entity extends IEntity> extends EntityList<Entity> {

	constructor(items?: any[], entityFactory?: (o: any) => Entity) {
		super(items);
		this.Entities = [];
		if (typeof items !== 'undefined') {
			this.pushArray(items, entityFactory);
		}
	}

	pushArray(items: any[], entityFactory?: (o: any) => Entity) {
		if (typeof entityFactory === 'undefined') {
			entityFactory = (entity: Entity) => { return entity; };
		}
		if (!items) {
			return this;
		}
		items.forEach((item) => {
			try {
				this.Entities.push(entityFactory(item));
			} catch (e) {
				console.warn('Entity was deleted from List becouse error happened during create entity', item, e);
			}
		});
		return this;
	}

	push(item: Entity): List<Entity> {
		this.Entities.push(item);
		return this;
	}

	remove(item: Entity): void {
		var i = _.indexOf(this.Entities, item);
		if (i === null) {
			throw new Error('Item ' + item + ' not exists in List');
		}
		this.Entities.splice(i, 1);
	}

	private returnValue(entity: Entity) {
		return entity;
	}
}
