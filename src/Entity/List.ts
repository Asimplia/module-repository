
import each = require('each');
import _ = require('underscore');
import IEntity = require('./IEntity');
import Util = require('asimplia-util');
import EntityList = Util.ODBM.Entity.List;

export = List;
class List<Entity extends IEntity> extends EntityList<Entity> {

	constructor(items?: any[], entityFactory?: (o: any) => Entity) {
		super(items);
		if (typeof items !== 'undefined') {
			this.entities = [];
			this.pushArray(items, entityFactory);
		}
	}

	pushArray(items: any[], entityFactory?: (o: any) => Entity) {
		super.pushArray(items, entityFactory);
		return this;
	}

	push(item: Entity): List<Entity> {
		super.push(item);
		return this;
	}

	remove(item: Entity): void {
		super.remove(item);
	}

	private returnValue(entity: Entity) {
		return entity;
	}
}
