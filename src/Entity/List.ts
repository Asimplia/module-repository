
import _ = require('underscore');
import IEntity = require('./IEntity');
import Util = require('asimplia-util');
import EntityList = Util.ODBM.Entity.List;
/* tslint:disable */
Util;
/* tslint:enable */

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
		items.forEach((item: any) => {
			this.Entities.push(entityFactory(item));
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
}
