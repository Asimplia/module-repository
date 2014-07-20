﻿/// <reference path="../typings/underscore/underscore.d.ts" />
var each = require('each');
import _ = require('underscore');
import IEntity = require('./IEntity');

export = List;
class List<Entity extends IEntity> {
	private entities: Entity[] = [];

	constructor(items?: Entity[], entityFactory?: (o: any) => Entity) {
		if (typeof items !== 'undefined') {
			if (typeof entityFactory === 'undefined') {
				throw new Error('You must specify entityFactory if items in constructor');
			}
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

	find(cb: (entity: Entity) => boolean): Entity {
		return _.find(this.entities, cb);
	}

	any(cb: (entity: Entity) => boolean): boolean {
		return _.any(this.entities, cb);
	}

	map(cb: (entity: Entity) => any) {
		return new List<any>(_.map(this.entities, cb), this.returnValue);
	}

	all(cb: (entity: Entity) => boolean): boolean {
		return _.all(this.entities, cb);
	}

	forEach(cb: (entity: Entity) => any) {
		this.entities.forEach(cb);
		return this;
	}

	createEach() {
		return each(this.entities);
	}

	private returnValue(entity: Entity) {
		return entity;
	}
}
