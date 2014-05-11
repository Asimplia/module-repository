
import IEntity = require('./IEntity');

export = List;
class List<Entity extends IEntity> {
	private entities: Entity[] = [];
	
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
}
